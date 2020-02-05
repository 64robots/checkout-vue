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
    imageSrc () {
      return this.cartItem.product.image.src
    },
    productName () {
      return this.cartItem.product.name
    }
  }
}