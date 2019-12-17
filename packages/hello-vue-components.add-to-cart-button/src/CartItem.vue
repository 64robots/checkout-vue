<template>
  <div>
    <span>Price: {{ cartItem.price }}</span>
    <span>Quantity: {{ cartItem.quantity }}</span>
    <button @click="update(cartItem.quantity + 1)">
      +
    </button>
    <button @click="update(cartItem.quantity - 1)">
      -
    </button>
    <button @click="remove">
      X
    </button>
  </div>
</template>

<script>
import cartItem from './api/cartItem'

export default {
  props: {
    cartItem: {
      type: Object,
      default: null
    }
  },
  methods: {
    update (quantity) {
      cartItem
        .update(this.cartItem.cart_item_token, quantity)
        .then(response => response.data)
        .then(response => {
          this.$emit('update')
        })
    },
    remove () {
      cartItem.delete(this.cartItem.cart_item_token)
        .then(response => response.data)
        .then(response => {
          this.$emit('delete')
        })
    }
  }
}
</script>
