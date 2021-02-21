<template>
  <a-layout id="basic-layout">
    <!-- 侧边栏 -->
    <a-layout-sider
      v-if="sideVisible"
      :width="sideWitch"
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      :class="[theme]"
    >
      <!-- 顶部图标 -->
      <Logo v-if="logo"></Logo>
      <!-- 垂直菜单 -->
      <Menu />
    </a-layout-sider>
    <!-- 右边区域 -->
    <a-layout>
      <!-- header区域 -->
      <a-layout-header>
        <Header></Header>
      </a-layout-header>
      <div>
         <!-- 选项卡页面 -->
        <Tab v-if="tab"></Tab>
      </div>
      <!-- 中心区域 -->
      <a-layout-content>
        <!-- main区域 -->
        <Content></Content>
        <!-- 设置页面 -->
        <Setup></Setup>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
import Menu from "./component/menu/index.vue";
import Content from "./component/content.vue";
import Header from "./component/header.vue";
import Logo from "./component/logo.vue";
import Tab from "./component/tab.vue";
import Setup from "./component/setup.vue";
export default {
  components: {
    Menu,
    Content,
    Header,
    Logo,
    Tab,
    Setup,
  },
  setup() {
    const { getters } = useStore();
    const sideVisible = computed(() => getters.sideVisible);
    const collapsed = computed(() => getters.sideCollapsed);
    const count = computed(() => getters.count);
    const logo = computed(() => getters.logo);
    const tab = computed(() => getters.tab);
    const theme = computed(() => getters.theme);
    const sideWitch = computed(() => getters.sideWitch);
    return {
      sideVisible,
      collapsed,
      sideWitch,
      count,
      theme,
      logo,
      tab,
    };
  },
};
</script>
<style lang='scss' scoped>
body,
html {
  height: 100%;
}
#basic-layout {
  height: 100%;
}
#basic-layout .ant-layout-header {
  padding-left: 10px !important;
  padding-right: 10px !important;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

#basic-layout .ant-layout-sider {
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  z-index: 999;
  overflow-y: auto;
  flex: 0 0 200px !important;
  max-width: 200px !important;
  min-width: 200px !important;
  width: 200px !important;

  &.ant-layout-sider-collapsed {
    flex: 0 0 80px !important;
    max-width: 80px !important;
    min-width: 80px !important;
    width: 80px !important;
  }
}

#basic-layout .ant-layout-content{
  overflow: hidden;
}

.ant-layout-sider::-webkit-scrollbar {
    width: 0;
}

.dark {
  background-color: #191a23 !important;
}
.light {
  background-color: white !important;
}
</style>
