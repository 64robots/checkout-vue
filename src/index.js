import './assets/app.css'
import R64Cart from './components/R64Cart'
import R64Checkout from './components/R64Checkout'
import R64Order from './components/R64Order'
import R64AddToCart from './components/renderless/R64AddToCart'
import cartApi from './api/cart'
import cartItemApi from './api/cartItem'
import orderApi from './api/order'
import checkoutApi from './api/checkout'

function install(Vue) {
    Vue.component('R64Cart', R64Cart)
    Vue.component('R64Checkout', R64Checkout)
    Vue.component('R64Order', R64Order)
}

export { R64Cart, R64Checkout, R64Order, R64AddToCart, cartApi, cartItemApi, orderApi, checkoutApi }
export default { install:install }