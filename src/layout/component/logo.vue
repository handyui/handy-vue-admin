<template>
  <div class="logo" :class="[theme]">
    <!-- 根据侧边收缩状态决定隐显内容 -->
    <!-- <span v-if="!collapsed"> -->
      <!-- <img :src="require('/@/assets/images/logo.png')"/> -->
      <img :src="logo" alt="">
    <!-- </span> -->
    <!-- 根据侧边收缩状态决定隐显内容 -->
    <!-- <span v-else><img :src="smallLogo" alt=""></span> -->
  </div>
</template>
<script>
import { computed, reactive, toRefs } from "vue"
import { useStore } from "vuex"
import logo from '/@/assets/images/logo.png'
// import smallLogo from '/@/assets/images/logo_small.png'

// 图 标 引 入
export default {
  setup() {
		const { getters } = useStore();
    const collapsed = computed(() => getters.sideCollapsed);
    const theme = computed(()=>getters.theme);
    const state = reactive({
      logo,
      // smallLogo
    })
    return {
      ...toRefs(state),
      collapsed,
      theme
    };
  },
};
</script>
<style scoped>
.logo {
  height: 65px;
  font-size: 22px;
  padding: 10px;
  text-align: center;
  color:white;
  border-bottom: 1px solid #101117;
  background: #191a23;
}
.logo img{
  height: 46px;
  /* width: 100%; */
}
.dark{
  background-color:  #191a23!important;
}
.light{
    border-bottom: 1px solid whitesmoke;
  background-color: white!important;
}
</style>
