package me.zhengjie.modules.mnt.rest;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import me.zhengjie.aop.log.Log;
import me.zhengjie.exception.BadRequestException;
import me.zhengjie.modules.mnt.domain.Database;
import me.zhengjie.modules.mnt.service.DatabaseService;
import me.zhengjie.modules.mnt.service.dto.DatabaseDto;
import me.zhengjie.modules.mnt.service.dto.DatabaseQueryCriteria;
import me.zhengjie.modules.mnt.util.*;
import me.zhengjie.utils.FileUtil;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.util.Set;

/**
 * @author zhanghouying
 * @date 2019-08-24
 */
@Api(tags = "数据库管理")
@RestController
@RequestMapping("/api/database")
public class DatabaseController {

    private String fileSavePath = System.getProperty("java.io.tmpdir");

    private final DatabaseService databaseService;

    public DatabaseController(DatabaseService databaseService) {
        this.databaseService = databaseService;
    }

    @Log("导出数据库数据")
    @ApiOperation("导出数据库数据")
    @GetMapping(value = "/download")
    @PreAuthorize("@el.check('database:list')")
    public void download(HttpServletResponse response, DatabaseQueryCriteria criteria) throws IOException {
        databaseService.download(databaseService.queryAll(criteria), response);
    }

    @Log("查询数据库")
    @ApiOperation(value = "查询数据库")
    @GetMapping
    @PreAuthorize("@el.check('database:list')")
    public ResponseEntity<Object> getDatabases(DatabaseQueryCriteria criteria, Pageable pageable) {
        return new ResponseEntity<>(databaseService.queryAll(criteria, pageable), HttpStatus.OK);
    }

    @Log("新增数据库")
    @ApiOperation(value = "新增数据库")
    @PostMapping
    @PreAuthorize("@el.check('database:add')")
    public ResponseEntity<Object> create(@Validated @RequestBody Database resources) {
        return new ResponseEntity<>(databaseService.create(resources), HttpStatus.CREATED);
    }

    @Log("修改数据库")
    @ApiOperation(value = "修改数据库")
    @PutMapping
    @PreAuthorize("@el.check('database:edit')")
    public ResponseEntity<Object> update(@Validated @RequestBody Database resources) {
        databaseService.update(resources);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @Log("删除数据库")
    @ApiOperation(value = "删除数据库")
    @DeleteMapping
    @PreAuthorize("@el.check('database:del')")
    public ResponseEntity<Object> delete(@RequestBody Set<String> ids) {
        databaseService.delete(ids);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Log("测试数据库链接")
    @ApiOperation(value = "测试数据库链接")
    @PostMapping("/testConnect")
    @PreAuthorize("@el.check('database:testConnect')")
    public ResponseEntity<Object> testConnect(@Validated @RequestBody Database resources) {
        return new ResponseEntity<>(databaseService.testConnection(resources), HttpStatus.CREATED);
    }

    @Log("执行SQL脚本")
    @ApiOperation(value = "执行SQL脚本")
    @PostMapping(value = "/upload")
    @PreAuthorize("@el.check('database:add')")
    public ResponseEntity<Object> upload(@RequestBody MultipartFile file, HttpServletRequest request) throws Exception {
        String id = request.getParameter("id");
        DatabaseDto database = databaseService.findById(id);
        String fileName;
        if (database != null) {
            fileName = file.getOriginalFilename();
            File executeFile = new File(fileSavePath + fileName);
            FileUtil.del(executeFile);
            file.transferTo(executeFile);
            String result = SqlUtils.executeFile(database.getJdbcUrl(), database.getUserName(), database.getPwd(), executeFile);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            throw new BadRequestException("Database not exist");
        }
    }

    /*
     * 备份数据库
     * */
    @Log("备份数据库")
    @ApiOperation(value = "备份数据库")
    @PostMapping("/backup")
    /*@PreAuthorize("@el.check('database:testConnect')")*/
    public ResponseEntity<Object> backup(HttpServletRequest request, HttpServletResponse response) {
        String stringFromStream = null;
        String id = null;
        try {
            stringFromStream = Payload.getBody(request);
            String[] split = stringFromStream.split(",");
            String[] split1 = split[0].split(":");
            id = split1[1].substring(1, split1[1].length() - 1);
        } catch (IOException e) {
            e.printStackTrace();
        }
        String host = null;
        String port = null;
        String databasename = null;
        DatabaseDto databaseDto = databaseService.findById(id);
        Database database = new Database();
        database.setId(databaseDto.getId());
        database.setName(databaseDto.getName());
        database.setUserName(databaseDto.getUserName());
        database.setPwd(databaseDto.getPwd());
        database.setJdbcUrl(databaseDto.getJdbcUrl());
        database.setCreateTime(databaseDto.getCreateTime());
        boolean b = databaseService.testConnection(database);
        String jdbcUrl = databaseDto.getJdbcUrl();
        if (!jdbcUrl.isEmpty()) {
            String[] split = jdbcUrl.split("//");
            String[] split1 = split[1].split("/");
            String[] split2 = split1[0].split(":");
            String[] split3 = split1[1].split("\\?");
            host = split2[0];
            port = split2[1];
            databasename = split3[0];
        }

        if (b) {
            //生成sql文件
            MySQLBackup.backupAndSave(databaseDto.getUserName(), databaseDto.getPwd(), databasename, host, port, "UTF8", "", fileSavePath);
            String backupSpth = fileSavePath + databasename + ".zip";
            System.out.println(backupSpth);
            File file = new File(backupSpth);
            //下载文件
            if (file.exists()) {
                    FileUtil.downloadFile(request,response,file,true);
                    //FileDownload.execute(request, response, backupSpth, databasename+".zip");
            } else {
                throw new BadRequestException("文件不存在");
            }


            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            throw new BadRequestException("Database not exist");
        }
    }

}
