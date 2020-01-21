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

    cartDiff () {
      return this.form.customer_email !== this.cart.customer_email ||
        this.form.shipping_first_name !== this.cart.shipping_first_name ||
        this.form.shipping_last_name !== this.cart.shipping_last_name ||
        this.form.shipping_address_line1 !== this.cart.shipping_address_line1 ||
        this.form.shipping_address_line2 !== this.cart.shipping_address_line2 ||
        this.form.shipping_address_city !== this.cart.shipping_address_city ||
        this.form.shipping_address_region !== this.cart.shipping_address_region ||
        this.form.shipping_address_zipcode !== this.cart.shipping_address_zipcode ||
        this.form.shipping_address_phone !== this.cart.shipping_address_phone ||
        this.form.billing_same !== this.cart.billing_same ||
        this.form.billing_first_name !== this.cart.billing_first_name ||
        this.form.billing_last_name !== this.cart.billing_last_name ||
        this.form.billing_address_line1 !== this.cart.billing_address_line1 ||
        this.form.billing_address_line2 !== this.cart.billing_address_line2 ||
        this.form.billing_address_zipcode !== this.cart.billing_address_zipcode ||
        this.form.billing_address_city !== this.cart.billing_address_city ||
        this.form.billing_address_region !== this.cart.billing_address_region ||
        this.form.billing_address_phone !== this.cart.billing_address_phone
    }
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

    async updateCart () {
      if (this.$v.$invalid || !this.cartDiff) {
        return
      }

      try {
        const { data } = await cart.update(this.cartToken, this.form)
        this.cart = data
      } catch (e) {
        //
      }

      this.$emit('cart:update', this.cart)
    },
  }
}