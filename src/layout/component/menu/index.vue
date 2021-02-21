<template>
  <div id="menu">
     <a-menu
        v-model:open-keys="openKeys"
        v-model:selected-keys="selectedKeys"
        mode="inline"
        :theme="theme"
        @click="clickMenuItem"
    >
    <template v-for="item in menus" :key="item.name">
      <menu-item :menu-info="item" />
    </template>
    </a-menu>
  </div>
</template>
<script>
import { computed, watch, getCurrentInstance, onMounted, reactive, ref, toRefs, toRef, isRef, unref} from "vue";
import { useRouter, useRoute } from 'vue-router'
import { useStore } from "vuex";
// import SubMenu from "./SubMenu.vue";
import MenuItem from './menu-item.vue'
import { genPath } from '/@/utils'
import { routes } from '/@/router/routes'

export default {
  components: {
    MenuItem,
  },
  setup() {
    const { getters, commit } = useStore();
    const { ctx } = getCurrentInstance();
    const currentRoute = useRoute();
    const router = useRouter()
    const store = useStore()
    // const routes = computed(() => ctx.$root.$router.options.routes)

    // 获取当前打开的子菜单
    const getOpenKeys = () => currentRoute.matched.length>1? [currentRoute.matched[1]?.name, currentRoute.matched[2]?.name]: [currentRoute.matched[1]?.name]

    const state = reactive({
      openKeys: getOpenKeys(),
      selectedKeys: [currentRoute.name]
    })

    // console.log(store.getters.menus)

    const menus = computed(() => store.getters.menus || routes.find(item => item.name == 'Layout').children)

    const menuModel = computed(() => getters.menuModel);
    const theme = computed(() => getters.theme);


    // 跟随页面路由变化，切换菜单选中状态
    watch(() => currentRoute.fullPath, () => {
      // if (currentRoute.name == 'login' || props.collapsed) return
      state.openKeys = getOpenKeys()
      state.selectedKeys = [currentRoute.name]
    })

    // 点击菜单
    const clickMenuItem = (val) => {
      const { item, key, keyPath , title} = val
      router.push({name: key})
    }

    return {
      ...toRefs(state),
      // routes,
      menuModel,
      theme,
      menus,
      clickMenuItem,
    };
  },
};
</script>
<style>
.ant-menu-sub.ant-menu-inline > .ant-menu-item,
.ant-menu-sub.ant-menu-inline > .ant-menu-submenu > .ant-menu-submenu-title {
  height: 48px;
  line-height: 48px;
}
.ant-menu-vertical > .ant-menu-item,
.ant-menu-vertical-left > .ant-menu-item,
.ant-menu-vertical-right > .ant-menu-item,
.ant-menu-inline > .ant-menu-item,
.ant-menu-vertical > .ant-menu-submenu > .ant-menu-submenu-title,
.ant-menu-vertical-left > .ant-menu-submenu > .ant-menu-submenu-title,
.ant-menu-vertical-right > .ant-menu-submenu > .ant-menu-submenu-title,
.ant-menu-inline > .ant-menu-submenu > .ant-menu-submenu-title {
  height: 48px !important;
  line-height: 48px !important;
}
.ant-layout-sider {
  background: #191a23 !important;
}
.ant-menu-dark,
.ant-menu-dark {
  background: #191a23 !important;
}
.ant-menu-dark .ant-menu-inline.ant-menu-sub {
  background-color: #101117 !important;
}
.ant-menu-vertical .ant-menu-item,
.ant-menu-vertical-left .ant-menu-item,
.ant-menu-vertical-right .ant-menu-item,
.ant-menu-inline .ant-menu-item,
.ant-menu-vertical .ant-menu-submenu-title,
.ant-menu-vertical-left .ant-menu-submenu-title,
.ant-menu-vertical-right .ant-menu-submenu-title,
.ant-menu-inline .ant-menu-submenu-title {
  margin-top: 4px !important;
  margin-bottom: 4px !important;
}

</style>
