// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store";
//引入axios
import axios from 'axios'
// 全局element
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import './assets/css/iconfont.js'

Vue.config.productionTip = false
Vue.use(ElementUI);

// 接口基准地址
axios.defaults.baseURL = 'http://localhost:8080'
// axios挂载到vue的原型对象上
Vue.prototype.$http = axios
// axios请求拦截
axios.interceptors.request.use(config => {
  // 为请求头添加token验证的Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem('token');
  return config;
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
