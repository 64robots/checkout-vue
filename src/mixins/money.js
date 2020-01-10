export default {
  props: {
    currencySymbol: {
      type: String,
      default: '$'
    }
  },

  methods: {
    money (price) {
      return `${this.currencySymbol}${price}`
    }
  }
}