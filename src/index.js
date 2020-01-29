import './assets/app.css'
import R64Cart from './components/R64Cart'
import R64Checkout from './components/R64Checkout'
import R64Order from './components/R64Order'
import R64AddToCart from './components/renderless/R64AddToCart'
import cartApi from './api/cart'
import orderApi from './api/order'

function install(Vue) {
    Vue.component('R64Cart', R64Cart)
    Vue.component('R64Checkout', R64Checkout)
    Vue.component('R64Order', R64Order)
    Vue.component('R64AddToCart', R64AddtoCart)
}

export { R64Cart, R64Checkout, R64Order, R64AddToCart, cartApi, orderApi }
export default { install:install }
