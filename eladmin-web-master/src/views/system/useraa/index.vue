<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <el-input v-model="query.name" clearable placeholder="输入姓名搜索内容" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />

        <el-date-picker
          v-model="query.createTime"
          :default-time="['00:00:00','23:59:59']"
          type="daterange"
          range-separator=":"
          size="small"
          class="date-item"
          value-format="yyyy-MM-dd HH:mm:ss"
          start-placeholder="createTimeStart"
          end-placeholder="createTimeEnd"
        />
        <el-select v-model="query.sex" clearable size="small" placeholder="状态" class="filter-item" style="width: 90px" @change="crud.toQuery">
        <el-option v-for="item in sexTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
        </el-select>
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="form.age" style="width: 370px;" />
          </el-form-item>
          <el-form-item v-if="form.pid !== 0" label="性别" prop="sex">
            <el-radio v-for="item in dict.useraa_status" :key="item.id" v-model="form.sex" :label="item.value">{{ item.label }}</el-radio>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="crud.cancelCU">取消</el-button>
          <el-button :loading="crud.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
        </div>
      </el-dialog>
      <!--表格渲染-->
      <el-table ref="table" v-loading="crud.loading" :data="crud.data" size="small" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
        <el-table-column type="selection" width="55" />
        <el-table-column v-if="columns.visible('name')" prop="name" label="姓名" />
        <el-table-column v-if="columns.visible('age')" prop="age" label="年龄" />
        <el-table-column v-if="columns.visible('sex')" prop="sex" label="性别">
          <template slot-scope="scope">
            {{ dict.label.useraa_status[scope.row.sex] }}
          </template>
        </el-table-column>
        <el-table-column v-if="columns.visible('createTime')" prop="createTime" label="创建日期">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column v-permission="['admin','useraa:edit','useraa:del']" label="操作" width="150px" align="center">
          <template slot-scope="scope">
            <udOperation
              :data="scope.row"
              :permission="permission"
            />
          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <pagination />
    </div>
  </div>
</template>

<script>
import crudUseraa from '@/api/system/useraa'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

// crud交由presenter持有
const defaultCrud = CRUD({ title: 'api/useraa', url: 'api/useraa', sort: 'id,desc', crudMethod: { ...crudUseraa }})
const defaultForm = { name: null, age: null, sex: null, createTime: null, id: null }
export default {
  name: 'Useraa',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(defaultCrud), header(), form(defaultForm), crud()],
  dicts: ['useraa_status'],
  data() {
    return {
      permission: {
        add: ['admin', 'useraa:add'],
        edit: ['admin', 'useraa:edit'],
        del: ['admin', 'useraa:del']
      },
      rules: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '性别不能为空', trigger: 'blur' }
        ]
      },
      sexTypeOptions: [
        { key: 'true', display_name: '男' },
        { key: 'false', display_name: '女' },

      ]
    }
  },
  methods: {
    // 获取数据前设置好接口地址
    [CRUD.HOOK.beforeRefresh]() {
      const query = this.query
      if (query.type && query.value) {
        this.crud.params[query.type] = query.value
      }
      return true
    }
  }
}
</script>

<style scoped>

</style>
