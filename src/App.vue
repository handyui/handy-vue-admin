<template>
  <router-view></router-view>
</template>

<script>
import { computed, watch, ref, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
export default {
  name: "App",
  setup(){
    onMounted(()=>{
      // console.log(process.env.NODE_ENV)
    })
  }
};
</script>

<style>
  #app,
  body,
  html {
    height: 100%;
  }
</style>
