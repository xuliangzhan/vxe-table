import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

if (process.env.NODE_ENV !== 'development') {
  document.onkeydown = evnt => {
    if (evnt.key.toLowerCase() === 'f12') {
      if (evnt.preventDefault) {
        evnt.preventDefault()
      } else {
        evnt.returnValue = false
      }
    }
  }
  document.oncontextmenu = evnt => {
    if (evnt.preventDefault) {
      evnt.preventDefault()
    } else {
      evnt.returnValue = false
    }
  }
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
