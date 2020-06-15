<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <eHeader :dict="dict" :permission="permission" />
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="ID">
            <el-input v-model="form.id" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="岗位名称" prop="name">
            <el-input v-model="form.name" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="岗位状态" prop="enabled">
            <el-input v-model="form.enabled" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="岗位排序" prop="sort">
            <el-input v-model="form.sort" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="部门ID">
            <el-input v-model="form.deptId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="创建日期">
            <el-input v-model="form.createTime" style="width: 370px;" />
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
        <el-table-column v-if="columns.visible('id')" prop="id" label="ID" />
        <el-table-column v-if="columns.visible('name')" prop="name" label="岗位名称" />
        <el-table-column v-if="columns.visible('enabled')" prop="enabled" label="岗位状态" />
        <el-table-column v-if="columns.visible('sort')" prop="sort" label="岗位排序" />
        <el-table-column v-if="columns.visible('deptId')" prop="deptId" label="部门ID" />
        <el-table-column v-if="columns.visible('createTime')" prop="createTime" label="创建日期">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column v-permission="['admin','job:edit','job:del']" label="操作" width="150px" align="center">
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
import crudJob from '@/api/system/job'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

// crud交由presenter持有
const defaultCrud = CRUD({ title: 's', url: 'api/job', sort: 'id,desc', crudMethod: { ...crudJob }})
const defaultForm = { id: null, name: null, enabled: null, sort: null, deptId: null, createTime: null }
export default {
  name: 'Job',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(defaultCrud), header(), form(defaultForm), crud()],
  data() {
    return {
      permission: {
        add: ['admin', 'job:add'],
        edit: ['admin', 'job:edit'],
        del: ['admin', 'job:del']
      },
      rules: {
        name: [
          { required: true, message: '岗位名称不能为空', trigger: 'blur' }
        ],
        enabled: [
          { required: true, message: '岗位状态不能为空', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '岗位排序不能为空', trigger: 'blur' }
        ]
      }    }
  },
  methods: {
    // 获取数据前设置好接口地址
    [CRUD.HOOK.beforeRefresh]() {
      return true
    }
  }
}
</script>

<style scoped>

</style>
