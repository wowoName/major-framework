import { createApp } from 'vue'
import Antd from 'ant-design-vue';
import App from './App.vue'
import store from '@/store'
import router from '@/router'
import 'ant-design-vue/dist/antd.css';
import './scss/common.scss'
import './scss/ant-design-theme.scss'

import "splitpanes/dist/splitpanes.css";
import './scss/splitPane.scss'
import sayHello from './mixin/major-router'


const app=createApp(App)
app.config.globalProperties.go = sayHello
app.use(sayHello)
app.use(store).use(router).use(Antd).mount('#app')
