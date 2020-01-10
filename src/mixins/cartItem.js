export default {
  props: {
    cartItem: {
      type: Object,
      default: null
    }
  },

  computed: {
    hasImage () {
      return this.cartItem.product.image
    },
    productName () {
      return this.cartItem.product.name
    }
  }
}