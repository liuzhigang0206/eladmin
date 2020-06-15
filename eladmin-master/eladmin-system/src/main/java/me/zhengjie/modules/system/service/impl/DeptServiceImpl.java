package me.zhengjie.modules.system.service.impl;

import cn.hutool.core.util.ObjectUtil;
import me.zhengjie.exception.BadRequestException;
import me.zhengjie.modules.system.domain.Dept;
import me.zhengjie.modules.system.service.dto.DeptDto;
import me.zhengjie.modules.system.service.dto.DeptQueryCriteria;
import me.zhengjie.utils.FileUtil;
import me.zhengjie.utils.QueryHelp;
import me.zhengjie.utils.ValidationUtil;
import me.zhengjie.modules.system.repository.DeptRepository;
import me.zhengjie.modules.system.service.DeptService;
import me.zhengjie.modules.system.service.mapper.DeptMapper;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.CellType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import java.io.*;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.*;
import java.util.stream.Collectors;

/**
 * @author Zheng Jie
 * @date 2019-03-25
 */
@Service
@CacheConfig(cacheNames = "dept")
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true, rollbackFor = Exception.class)
public class DeptServiceImpl implements DeptService {
    @Value("${file.path}")
    private String path;

    @Value("${file.maxSize}")
    private long maxSize;
    @Autowired
    private DataSource dataSource;

    private final DeptRepository deptRepository;

    private final DeptMapper deptMapper;


    public DeptServiceImpl(DeptRepository deptRepository, DeptMapper deptMapper) {
        this.deptRepository = deptRepository;
        this.deptMapper = deptMapper;
    }

    @Override
    @Cacheable
    public List<DeptDto> queryAll(DeptQueryCriteria criteria) {
        return deptMapper.toDto(deptRepository.findAll((root, criteriaQuery, criteriaBuilder) -> QueryHelp.getPredicate(root, criteria, criteriaBuilder)));
    }

    @Override
    @Cacheable(key = "#p0")
    public DeptDto findById(Long id) {
        Dept dept = deptRepository.findById(id).orElseGet(Dept::new);
        ValidationUtil.isNull(dept.getId(), "Dept", "id", id);
        return deptMapper.toDto(dept);
    }

    @Override
    @Cacheable
    public List<Dept> findByPid(long pid) {
        return deptRepository.findByPid(pid);
    }

    @Override
    public Set<Dept> findByRoleIds(Long id) {
        return deptRepository.findByRoles_Id(id);
    }

    @Override
    @Cacheable
    public Object buildTree(List<DeptDto> deptDtos) {
        Set<DeptDto> trees = new LinkedHashSet<>();
        Set<DeptDto> depts = new LinkedHashSet<>();
        List<String> deptNames = deptDtos.stream().map(DeptDto::getName).collect(Collectors.toList());
        boolean isChild;
        for (DeptDto deptDTO : deptDtos) {
            isChild = false;
            if ("0".equals(deptDTO.getPid().toString())) {
                trees.add(deptDTO);
            }
            for (DeptDto it : deptDtos) {
                if (it.getPid().equals(deptDTO.getId())) {
                    isChild = true;
                    if (deptDTO.getChildren() == null) {
                        deptDTO.setChildren(new ArrayList<>());
                    }
                    deptDTO.getChildren().add(it);
                }
            }
            if (isChild) {
                depts.add(deptDTO);
            } else if (!deptNames.contains(deptRepository.findNameById(deptDTO.getPid()))) {
                depts.add(deptDTO);
            }
        }

        if (CollectionUtils.isEmpty(trees)) {
            trees = depts;
        }

        Integer totalElements = deptDtos.size();

        Map<String, Object> map = new HashMap<>(2);
        map.put("totalElements", totalElements);
        map.put("content", CollectionUtils.isEmpty(trees) ? deptDtos : trees);
        return map;
    }

    @Override
    @CacheEvict(allEntries = true)
    @Transactional(rollbackFor = Exception.class)
    public DeptDto create(Dept resources) {
        return deptMapper.toDto(deptRepository.save(resources));
    }

    @Override
    @CacheEvict(allEntries = true)
    @Transactional(rollbackFor = Exception.class)
    public DeptDto upload(MultipartFile multipartFile) {
        File file =null;
        try {
            Connection connection = dataSource.getConnection();
            PreparedStatement statement = null;

            FileUtil.checkSize(maxSize, multipartFile.getSize());
            String suffix = FileUtil.getExtensionName(multipartFile.getOriginalFilename());
            String type = FileUtil.getFileType(suffix);
            file = FileUtil.upload1(multipartFile, path + type + File.separator);
            if (ObjectUtil.isNull(file)) {
                throw new BadRequestException("上传失败");
            }
            String xlsFile = file.getPath();

            if (!(xlsFile.endsWith(".xls") || xlsFile.endsWith(".xlsx"))) {
                throw new BadRequestException("文件格式错误，应为.xls 或 .xlsx，你的: " + xlsFile);
            }
            try {
                InputStream in = new FileInputStream(xlsFile);
                HSSFWorkbook workbook = new HSSFWorkbook(in);
                //获取工作簿中表的数量
                int sheetNum = workbook.getNumberOfSheets();
                //遍历每一张表
                for (int i = 0; i < sheetNum; i++) {
                    //获取当前操作的表
                    HSSFSheet sheet = workbook.getSheetAt(i);
                    //获取当前操作表的名称 -- 数据库表名
                    String sheetName = sheet.getSheetName();
                    //获取当前操作表的数据行数
                    int rowNum = sheet.getLastRowNum();
                    //获取第一行 -- 表中的列名
                    HSSFRow firstRow = sheet.getRow(0);
                    //获取每一行的列数
                    int colNum = firstRow.getLastCellNum();

                    //获取表中列名  表头 id,name,age...
                    StringBuffer columnNames = new StringBuffer();
                    for (int j = 0; j < colNum; j++) {
                        columnNames.append(firstRow.getCell(j).getStringCellValue());
                        columnNames.append(",");
                    }
                    columnNames.deleteCharAt(columnNames.length() - 1);

                    //遍历除第一行以外的其它行 -- 数据
                    for (int j = 1; j <= rowNum; j++) {
                        //获取当前操作的行
                        HSSFRow currRow = sheet.getRow(j);
                        //遍历当前操作行的每一列
                        StringBuffer values = new StringBuffer();
                        for (int col = 0; col < colNum; col++) {
                            HSSFCell cell = currRow.getCell(col);
                            cell.setCellType(CellType.STRING);
                            values.append("'" + cell.getStringCellValue() + "'");
                            values.append(",");

                        }

                        values.deleteCharAt(values.length() - 1);
                        String sql = "INSERT INTO " + sheetName + " (" + columnNames.toString() + ") VALUES (" + values.toString() + ")";

                        try {
                            statement = connection.prepareStatement(sql);
                            statement.execute();

                        } catch (SQLException e) {
                            e.printStackTrace();
                            throw new BadRequestException("执行SQL语句出错" + sql);

                        } finally {
                            if (statement != null) {
                                try {
                                    statement.close();
                                } catch (SQLException e) {
                                    e.printStackTrace();
                                    throw new BadRequestException("关闭statement失败");

                                }
                            }
                        }

                    }

                }


            } catch (FileNotFoundException e) {
                throw new BadRequestException("找不到目标文件: " + xlsFile);
            } catch (IOException e) {
                throw new BadRequestException("连接数据库失败");

            }
        } catch (SQLException e) {
            e.printStackTrace();
        }finally {
            if (!ObjectUtil.isNull(file)) {
                //删除临时文件
                file.delete();
            }
        }
        return null;
    }

    @Override
    @CacheEvict(allEntries = true)
    @Transactional(rollbackFor = Exception.class)
    public void update(Dept resources) {
        if (resources.getId().equals(resources.getPid())) {
            throw new BadRequestException("上级不能为自己");
        }
        Dept dept = deptRepository.findById(resources.getId()).orElseGet(Dept::new);
        ValidationUtil.isNull(dept.getId(), "Dept", "id", resources.getId());
        resources.setId(dept.getId());
        deptRepository.save(resources);
    }

    @Override
    @CacheEvict(allEntries = true)
    @Transactional(rollbackFor = Exception.class)
    public void delete(Set<DeptDto> deptDtos) {
        for (DeptDto deptDto : deptDtos) {
            deptRepository.deleteById(deptDto.getId());
        }
    }

    @Override
    public void download(List<DeptDto> deptDtos, HttpServletResponse response) throws IOException {
        List<Map<String, Object>> list = new ArrayList<>();
        for (DeptDto deptDTO : deptDtos) {
            Map<String, Object> map = new LinkedHashMap<>();
            map.put("部门名称", deptDTO.getName());
            map.put("部门状态", deptDTO.getEnabled() ? "启用" : "停用");
            map.put("创建日期", deptDTO.getCreateTime());
            map.put("部门编号", deptDTO.getNumber());
            list.add(map);
        }
        FileUtil.downloadExcel(list, response);
    }

    @Override
    public Set<DeptDto> getDeleteDepts(List<Dept> menuList, Set<DeptDto> deptDtos) {
        for (Dept dept : menuList) {
            deptDtos.add(deptMapper.toDto(dept));
            List<Dept> depts = deptRepository.findByPid(dept.getId());
            if (depts != null && depts.size() != 0) {
                getDeleteDepts(depts, deptDtos);
            }
        }
        return deptDtos;
    }
}