import { createApp } from 'vue'
import App from './App.vue';
import Antd from 'ant-design-vue';
import router from './router/index'
import store from './store'
// import 'ant-design-vue/dist/antd.css';
import '/@/assets/style/ant.css';
import '/@/assets/style/index.scss';
// 路由守卫
import '/@/utils/permission'
// import { mockServer } from './mock';

// if (process.env.NODE_ENV === 'production') {
    // mockServer()
// }

createApp(App).use(Antd).use(store).use(router).mount('#app')
