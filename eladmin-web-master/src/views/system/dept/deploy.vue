<template>
  <el-dialog append-to-body :close-on-click-modal="false" :visible.sync="dialog" title="部门批量操作" width="400px">
    <el-form ref="form" :model="form"  size="small">
      <el-upload
      ref="upload"
        :action="deptfileUploadApi"
        :before-upload="beforeUpload"
        :data="deployInfo"
        :auto-upload="false"
        :headers="headers"
        :on-success="handleSuccess"
        :on-error="handleError"
        class="upload-demo"
        drag
      >
        <i class="el-icon-upload" />
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div slot="tip" class="el-upload__tip">上传xls或xlsx文件，第一行指定数据名称(id,number,name,pid,enabled)</div>
      </el-upload>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="upload">确认</el-button>
      <el-button type="primary" @click="cancel">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import rrOperation from '@crud/RR.operation'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
// crud交由presenter持有
/* const defaultCrud = CRUD({ title: '文件', url: 'api/localStorage', crudMethod: { ...crudFile }}) */
export default {
  props: {},
  data() {
    return {
        headers: { 'Authorization': getToken() },
        dialog: false
    }
  },
  computed: {
    ...mapGetters(['deptfileUploadApi'])
  },

  methods: {
    cancel() {
      this.resetForm()
    },
    upload() {
      this.$refs.upload.submit()
    },
    beforeUpload(file) {
      const isJPG1 = file.type === 'application/vnd.ms-excel';
      const isJPG2 = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

      const isLt2M = file.size / 1024 / 1024 < 100

      if (isJPG1== false) {
        if (isJPG2== false) {
          this.$message.error('上传文件只能是xls或xlsx!');
        }else{
          return true;
        }
      }else{
        return true;
      }

      if (!isLt2M) {
        this.loading = false
        this.$message.error('上传文件大小不能超过 100MB!')
      }
       return isJPG;
    },
    handleSuccess(response, file, fileList) {
      this.$notify({
        title: '添加成功',
        type: 'success',
        duration: 2500
      })
      this.loading = false,
      this.$refs.upload.clearFiles()
      this.cancel()
      
    },
    // 监听上传失败
    handleError(e, file, fileList) {
      const msg = JSON.parse(e.message)
      this.$notify({
        title: msg.message,
        type: 'error',
        duration: 2500
      })
      this.loading = false
    },

    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = {
        id: '',
        appId: '',
        ip: '',
        selectIp: []
      }
    },



  }
}
</script>

<style scoped>
</style>
