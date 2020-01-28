<template>
  <div id="app">
    <div v-if="section === null" class="mt-20 max-w-xs mx-auto">
      <R64AddtoCart :cart-token="cartToken" @cart:update="cartUpdate" :product-id="1" class="mt-20 max-w-xs mx-auto"/>
      <R64AddtoCart :cart-token="cartToken" @cart:update="cartUpdate" :product-id="2" class="mt-20 max-w-xs mx-auto"/>
      <R64Button class="mt-20" @click.native="section = 'cart'">Cart</R64Button>
    </div>
    <R64Cart 
      v-if="section === 'cart'"
      :cart-token="cartToken"
      @cart:update="cartUpdate"  
      @close="section = null" 
      @checkout="section = 'checkout'"
    />
    <R64Checkout
      v-if="section === 'checkout'"
      :cart-token="cartToken"
      :auth-token="authToken"
      stripe-key="pk_test_t9zUIgcNA0SwHCPuan3rYsew" 
      customer-notes="Customer Notes"
      @cart:update="cartUpdate" 
      @cart="section = 'cart'" 
      @order:create="orderCreate"
    />
    <R64Order 
      v-if="section === 'order' && order" 
      :order-id="order.id"
      :auth-token="authToken"
    />
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
      section: null,
      authToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImp0aSI6ImhGTnBKRFRhYWpBSXJHbEEifQ.eyJpc3MiOiJodHRwOlwvXC9kcXMtYmFja2VuZC50ZXN0Iiwic3ViIjoiNTk3NyIsImp0aSI6ImhGTnBKRFRhYWpBSXJHbEEiLCJpYXQiOjE1ODAyMjUwMzMsIm5iZiI6MTU4MDIyNTAzMywiZXhwIjoxNTgwNjU3MDMzLCJybGkiOjE1ODEwODkwMzN9.65r7UuulmD2ZZOG3JoAqkyZtokSdkPBenuUJmvNfnhs',
      cart: null,
      order: {
        id: 1
      }
    }
  },

  computed: {
    cartToken () {
      // return 'JsDq00H4HTRv1XNLkkoZiWNFPOt5bt'
      return this.cart && this.cart.cart_token
    }
  },

  methods: {
    cartUpdate (cart) {
      this.cart = cart
    },

    orderCreate (order) {
      this.order = order
      this.section = 'order'
    }
  }
}
</script>

<style src="./assets/app.css">