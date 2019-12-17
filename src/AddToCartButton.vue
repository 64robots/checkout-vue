<template>
  <button @click="addToCart">
    Add to cart
  </button>
</template>

<script>
import cartItem from './api/cartItem'

export default {
  name: 'AddToCartButton',
  props: {
    cartToken: {
      type: String,
      default: null
    },
    productId: {
      type: String,
      default: null
    },
    quantity: {
      type: String,
      default: null
    }
  },
  methods: {
    addToCart () {
      cartItem.create(this.cartToken, {
        product_id: this.productId,
        quantity: this.quantity
      }).then(response => response.data)
        .then(response => {
          this.$emit('add')
        })
    }
  }
}
</script>
