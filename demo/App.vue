<template>
  <div id="app">
    <Cart
      v-if="cart"
      :cart="cart"
      @update="refreshCart"
      @delete="refreshCart"
    />

    <label>
      Product id:
      <input v-model="productId">
    </label>

    <label>
      Quantity:
      <input v-model="quantity">
    </label>

    <AddToCartButton
      v-if="cart"
      :cart-token="cart.cart_token"
      :product-id="productId"
      :quantity="quantity"
      @add="refreshCart"
    />
  </div>
</template>

<script>
import { cart } from '../src'

export default {
  data () {
    return {
      productId: null,
      quantity: null,
      cart: null
    }
  },
  mounted () {
    this.createCart()
  },
  methods: {
    createCart () {
      cart.create()
        .then(response => response.data)
        .then(response => {
          this.cart = response.data
        })
    },
    refreshCart () {
      cart.get(this.cart.cart_token)
        .then(response => response.data)
        .then(response => {
          this.cart = response.data
        })
    }
  }
}
</script>
