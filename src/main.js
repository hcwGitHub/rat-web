// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import 'jquery'


import Element from 'element-ui'; //element
import 'element-ui/lib/theme-chalk/index.css';

// import '@/styles/index.scss' // 全局scss
import '@/styles/updataElement.scss' // 修改element组件的scss

Vue.use(Element);
Vue.config.productionTip = false
Vue.prototype.$axios = axios    //全局注册，使用方法为:this.$axios


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>'
})
