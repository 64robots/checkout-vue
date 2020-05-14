import R64Cart from './R64Cart'
import R64Checkout from './R64Checkout'
import R64Order from './R64Order'
import R64AddToCart from './renderless/R64AddToCart'
import cartApi from '../api/cart'
import cartItemApi from '../api/cartItem'
import orderApi from '../api/order'
import checkoutApi from '../api/checkout'

const components = {
  R64Cart, 
  R64Checkout, 
  R64Order, 
  R64AddToCart,
  cartApi,
  cartItemApi,
  orderApi,
  checkoutApi,
}

export {
  R64Cart, 
  R64Checkout, 
  R64Order, 
  R64AddToCart,
}

export default components
