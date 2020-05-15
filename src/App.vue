<template>
  <div id="app">
    <div v-if="section === null" class="c-mt-20 c-max-w-xs c-mx-auto">
      <R64AddtoCart :cart-token="cartToken" @cart:update="cartUpdate" :product-id="11" class="c-mt-20 c-max-w-xs c-mx-auto"/>
      <R64AddtoCart :cart-token="cartToken" @cart:update="cartUpdate" :product-id="2" class="c-mt-20 c-max-w-xs c-mx-auto"/>
      <R64AddtoCart :cart-token="cartToken" @cart:update="showSingleCheckout" :product-id="1" class="c-mt-20 c-max-w-xs c-mx-auto">
        Buy
      </R64AddtoCart>
      <R64Button class="c-mt-20" @click.native="section = 'cart'">Cart</R64Button>
    </div>
    <R64Cart
      v-if="section === 'cart'"
      :cart-token="cartToken"
      :currency-symbol="settings.currency_symbol"
      @cart:update="cartUpdate"
      @close="section = null"
      @checkout="section = 'checkout'"
    />
    <R64Checkout
      v-if="section === 'checkout'"
      zipcode-request
      shipping-request
      :cart-token="cartToken"
      :settings="settings"
      :currency-symbol="settings.currency_symbol"
      :stripe-key="stripeKey"
      @cart:update="cartUpdate"
      @cart="section = 'cart'"
      @order:create="orderCreate"
    />
    <R64SingleItemCheckout
      v-if="section === 'single_checkout'"
      with-coupons
      zipcode-request
      shipping-request
      :cart-token="cartToken"
      :settings="settings"
      :currency-symbol="settings.currency_symbol"
      :stripe-key="stripeKey"
      @cart:update="cartUpdate"
      @close="section = null"
      @order:create="orderCreate"
    />
    <R64Order
      with-billing
      v-if="section === 'order' && order"
      :order-token="order.token"
      :currency-symbol="settings.currency_symbol"
    />
  </div>
</template>

<script>
import R64Cart from './components/R64Cart'
import R64Checkout from './components/R64Checkout'
import R64SingleItemCheckout from './components/R64SingleItemCheckout'
import R64Order from './components/R64Order'
import R64Button from "./components/R64Button"
import R64AddtoCart from "./components/R64AddtoCart"
import checkout from './api/checkout'

export default {
  name: 'app',

  components: {
    R64Button,
    R64Cart,
    R64Checkout,
    R64SingleItemCheckout,
    R64Order,
    R64AddtoCart
  },

  data() {
    return {
      section: null,
      settings: null,
      authToken: null,
      cart: null,
      order: {
        id: 1
      }
    }
  },

  computed: {
    cartToken () {
      return this.cart && this.cart.cart_token
    },

    stripeKey() {
      return process.env.VUE_APP_STRIPE_KEY
    },
  },

  mounted () {
    this.fetchSettings();
  },

  methods: {
    cartUpdate (cart) {
      this.cart = cart
    },

    showSingleCheckout (cart) {
      this.cart = cart
      this.section = 'single_checkout'
    },

    orderCreate (order) {
      this.order = order
      this.section = 'order'
    },

    async fetchSettings () {
      try {
        const { data } = await checkout.settings()
        this.settings = data
      } catch (e) {
        //
      }
    }
  }
}
</script>
