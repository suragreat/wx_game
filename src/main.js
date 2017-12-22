// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router/index'

import './mock/index.js'
import'./assets/css/main.css'

FastClick.attach(document.body)

Vue.config.productionTip = false

import  { LoadingPlugin } from 'vux'
Vue.use(LoadingPlugin)


import global_ from './components/Global'
Vue.prototype.GLOBAL = global_

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
