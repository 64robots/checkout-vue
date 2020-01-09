<template>
  <div id="app">
    <div v-if="section === null" class="mt-20 max-w-xs mx-auto">
        <R64AddtoCart :cart-token="cart.cart_token" @cart:update="(newCart) => cart = newCart" product-id="1" class="mt-20 max-w-xs mx-auto"/>
        <R64Button @click.native="section = 'cart'">Cart</R64Button>
    </div>
    <R64Cart v-if="section === 'cart'" @close="section = null" @checkout="section = 'checkout'"/>
    <R64Checkout v-if="section === 'checkout'" @cart="section = 'cart'" @order="section = 'order'"/>
    <R64Order v-if="section === 'order'" />
  </div>
</template>

<script>
import R64Cart from './components/R64Cart'
import R64Checkout from './components/R64Checkout'
import R64Order from './components/R64Order'
import R64Button from "./components/R64Button";
import R64AddtoCart from "./components/R64AddtoCart";
import cart from './api/cart'

export default {
  name: 'app',

  data () {
      return {
          section: null,
          cart: null
      }
  },

  async mounted () {
      try {
          const { data } = await cart.create()
          this.cart = data
      } catch (e) {
          //
      }
  },

  components: {
    R64Button,
    R64Cart,
    R64Checkout,
    R64Order,
    R64AddtoCart
  }
}
</script>
