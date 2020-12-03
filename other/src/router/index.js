import Vue from 'vue'
import VueRouter from 'vue-router'
import Support from '../views/Support.vue'
import Pro from '../views/Pro.vue'
import ProLog from '../views/ProLog.vue'
import ProAuth from '../views/ProAuth.vue'
import Filter from '../views/Filter.vue'
import Edit from '../views/Edit.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {
      name: 'Support'
    }
  },
  {
    path: '/support',
    name: 'Support',
    component: Support
  },
  {
    path: '/pro',
    name: 'Pro',
    component: Pro
  },
  {
    path: '/proLog',
    name: 'ProLog',
    component: ProLog
  },
  {
    path: '/proAuth',
    name: 'ProAuth',
    component: ProAuth
  },
  {
    path: '/filter',
    name: 'Filter',
    component: Filter
  },
  {
    path: '/edit',
    name: 'Edit',
    component: Edit
  }
]

const router = new VueRouter({
  routes
})

export default router
