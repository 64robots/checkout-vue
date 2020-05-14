import './assets/app.css'
import Vue from 'vue'
import Dev from '@/dev.vue'

Vue.config.productionTip = false

new Vue({
  render: (h) => h(Dev),
}).$mount('#app')
