import R64Cart from './components/R64Cart'
import R64Checkout from './components/R64Checkout'
import R64Order from './components/R64Order'

function install(Vue) {
    Vue.component('R64Cart', R64Cart)
    Vue.component('R64Checkout', R64Checkout)
    Vue.component('R64Order', R64Order)
}

export { R64Cart, R64Checkout, R64Order }
export default { install:install }
