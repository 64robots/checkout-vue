export default {
  data () {
    return {
      hasPromoCode: false,
      promoCode: null
    }
  },

  methods: {
    applyPromoCode () {
      this.$emit('apply', this.promoCode)
    }
  }
}