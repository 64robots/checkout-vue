<template>
  <div id="app">
    <div v-if="section === null" class="mt-20 max-w-xs mx-auto">
      <R64AddtoCart :cart-token="cartToken" @cart:update="cartUpdate" :product-id="1" class="mt-20 max-w-xs mx-auto"/>
      <R64AddtoCart :cart-token="cartToken" @cart:update="cartUpdate" :product-id="2" class="mt-20 max-w-xs mx-auto"/>
      <R64Button class="mt-20" @click.native="section = 'cart'">Cart</R64Button>
    </div>
    <R64Cart :cart-token="cartToken" @cart:update="cartUpdate" v-if="section === 'cart'" @close="section = null" @checkout="section = 'checkout'"/>
    <R64Checkout :cart-token="cartToken" @cart:update="cartUpdate" v-if="section === 'checkout'" @cart="section = 'cart'" @order="section = 'order'"/>
    <R64Order v-if="section === 'order'"/>
  </div>
</template>

<script>
import R64Cart from './components/R64Cart'
import R64Checkout from './components/R64Checkout'
import R64Order from './components/R64Order'
import R64Button from "./components/R64Button";
import R64AddtoCart from "./components/R64AddtoCart";

export default {
  name: 'app',

  components: {
    R64Button,
    R64Cart,
    R64Checkout,
    R64Order,
    R64AddtoCart
  },

  data() {
    return {
      section: 'checkout',
      cart: null
    }
  },

  computed: {
    cartToken () {
      return 'zkOQuIQkpe1NNclvyz4wYGw8iPNUHX'
      // return this.cart && this.cart.cart_token
    }
  },

  methods: {
    cartUpdate (cart) {
      this.cart = cart
    }
  }
}
</script>
