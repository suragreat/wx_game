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

import  { LoadingPlugin, WechatPlugin, AlertPlugin, ToastPlugin, ConfirmPlugin } from 'vux'

Vue.use(LoadingPlugin)
Vue.use(WechatPlugin)
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)

import VueLazyLoad from 'vue-lazyload'
import VueTouch from 'vue-touch'
Vue.use(VueLazyLoad)
Vue.use(VueTouch, { name: 'v-touch' })

import global_ from './components/Global'
Vue.prototype.GLOBAL = global_

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
