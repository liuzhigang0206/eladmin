<template>
  <el-dialog append-to-body :close-on-click-modal="false" :visible.sync="dialog" title="应用部署" width="400px">
    <el-form ref="form" :model="form" size="small">
      <el-upload
        ref="upload"
        :action="deptfileUploadApi"
        :headers="headers"
        :on-success="handleSuccess"
        :on-error="handleError"
        v-permission="['admin','dept:add']"
        class="upload-demo" drag>
        <i class="el-icon-upload" />
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div slot="tip" class="el-upload__tip">多个应用上传文件名称为all.zip,数据库更新脚本扩展名为.sql,上传成功后系统自动部署系统。</div>
      </el-upload>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="cancel">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {    mapGetters  } from 'vuex'
  import {    getToken  } from '@/utils/auth'
  export default {
    props: {},
    data() {
      return {
        headers: {
          Authorization: getToken()
        },
        dialog: false

      }
    },
    computed: {
      ...mapGetters([
        'baseApi',
        'deptfileUploadApi'
      ])
    },
    methods: {
      upload() {
        this.$refs.upload.submit()
      },
      cancel() {
        this.resetForm()
      },
      handleSuccess(response, file, fileList) {
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
      }


    }
  }
</script>

<style scoped>
</style>
