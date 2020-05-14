import cart from '../api/cart'

export default {
  props: {
    cartToken: {
      type: String,
      default: null
    }
  },

  data () {
    return {
      cart: null
    }
  },

  computed: {
    cartItems () {
      return this.cart ? this.cart.cart_items : []
    },
  },

  methods: {
    async fetchCart () {
      try {
        if (!this.cartToken) {
          const { data } = await cart.create()
          this.cart = data
        } else {
          const { data } = await cart.get(this.cartToken)
          this.cart = data
        }
      } catch (e) {
        //
      }

      this.$emit('cart:update', this.cart)
    },
  }
}