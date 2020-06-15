<template>
  <el-button @click="closeOthersTags">默认按钮</el-button>
<!-- <div><router-link to="/test">vue直接用路由跳转</router-link></div> -->
<!-- <p><router-link to="/test">vue直接用路由跳转</router-link></p> -->
</template>

<script>
import { mapGetters } from 'vuex'
  export default {
    name: 'Test',
    methods: {
      closeOthersTags: function(){
              this.$router.push({
                path: this.redirect || '/test'
              })
            }
    }


  }
</script>

<style>
</style>
