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
  },

  watch: {
    hasPromoCode () {
      this.$nextTick(() => (this.$refs.promo_code.$el.focus()))
    }
  }
}