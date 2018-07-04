// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import App from './App'
import goods from './components/goods/goods'
import ratings from './components/ratings/ratings'
import sellers from './components/sellers/sellers'
import 'common/stylus/index.styl'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueResource)

const routes = [
    { path: '/', component: goods },
    { path: '/goods', component: goods },
    { path: '/ratings', component: ratings },
    { path: '/sellers', component: sellers }
]
let router = new VueRouter({
    linkActiveClass: 'active',
    routes
})
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: h => h(App)
})