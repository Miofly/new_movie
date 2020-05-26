import Vue from 'vue'
import App from './App'

import dm from './pages/index/movie/dm'
import dy from './pages/index/movie/dy'
import mvIndex from './pages/index/movie/mvIndex'
import lxj from './pages/index/movie/lxj'
import zy from './pages/index/movie/zy'

import '@/common/css/module/font-awesome.css' // font-awesome图标
import store from './store' // 引入vuex
import {RouterMount} from 'uni-simple-router'
import routerLink from '../node_modules/uni-simple-router/component/router-link.vue'
import colorData from './static/mockJson/color'
import {ui} from '@/common/js/uniapp'
import {tu} from '@/common/js/toolUtils'
import Router from '@/router'

Vue.prototype.ui = ui
Vue.prototype.tu = tu
Vue.prototype.router = Router

Vue.component('dm', dm)
Vue.component('dy', dy)
Vue.component('mvIndex', mvIndex)
Vue.component('lxj', lxj)
Vue.component('zy', zy)


Vue.prototype.ColorList = colorData

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
    store
})

// v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
RouterMount(app, '#app')
// #endif

// #ifndef H5
app.$mount() // 为了兼容小程序及app端必须这样写才有效果
// #endif
