<template>
  <div>
    <div class="mt-6">
      <label class="block">
        <span>Card Number</span>
        <div class="relative">
          <span class="absolute top-0 bottom-0 left-0 px-3 flex items-center">
              <svg class="w-5 h-5" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 0H2C.89 0 .01.89.01 2L0 14c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V2c0-1.11-.89-2-2-2zm0 14H2V8h16v6zm0-10H2V2h16v2z" fill="#737373"/></svg>
          </span>
          <div ref="card_number" class="mt-2 w-full h-10 px-10 rounded border border-c-gray text-base focus:outline-none focus:border-c-grayer" style="padding-top: 10px"></div>
        </div>
      </label>
      <div class="mt-2 flex items-center">
          <span class="text-sm">We accept</span>
          <span class="ml-2 w-8 h-5 flex items-center justify-center border border-c-gray rounded-sm">
              <img src="../assets/american_express.png">
          </span>
          <span class="ml-2 w-8 h-5 flex items-center justify-center border border-c-gray rounded-sm">
              <img src="../assets/discover.png">
          </span>
          <span class="ml-2 w-8 h-5 flex items-center justify-center border border-c-gray rounded-sm">
              <img src="../assets/jcb.png">
          </span>
          <span class="ml-2 w-8 h-5 flex items-center justify-center border border-c-gray rounded-sm">
              <img src="../assets/master_card.png">
          </span>
          <span class="ml-2 w-8 h-5 flex items-center justify-center border border-c-gray rounded-sm">
              <img src="../assets/visa.png">
          </span>
      </div>
    </div>
    <div class="mt-6 flex">
      <div class="w-full">
        <label class="block">
          <span>Expiration Date</span>
          <div ref="card_expiry" class="mt-2 h-10 px-3 rounded border border-c-gray text-base focus:outline-none focus:border-c-grayer" style="padding-top: 10px"></div>
        </label>
      </div>
      <div class="w-full ml-4">
        <label class="block">
          <span>Security Code</span>
          <div ref="card_cvc" class="mt-2 h-10 px-3 rounded border border-c-gray text-base focus:outline-none focus:border-c-grayer" style="padding-top: 10px"></div>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { injectStripe, createStripe } from '../helpers/stripe'

export default {
  props: {
    stripeKey: {
      type: String,
      default: null
    }
  },

  data () {
    return {
      stripe: null,
      cardNumber: null,
      cardExpiry: null,
      cardCvc: null
    }
  },

  async mounted () {
    await injectStripe('js.stripe.com/v3/')
    this.stripe = createStripe(this.stripeKey)
    const stripeElements = this.stripe.elements()
    const style = {
      base: {
        fontSize: '16px'
      }
    }

    this.cardNumber = stripeElements.create('cardNumber', { style: style })
    this.cardExpiry = stripeElements.create('cardExpiry', { style: style })
    this.cardCvc = stripeElements.create('cardCvc', { style: style })

    this.cardNumber.mount(this.$refs.card_number)
    this.cardExpiry.mount(this.$refs.card_expiry)
    this.cardCvc.mount(this.$refs.card_cvc)
  },

  methods: {
    createToken () {
      return this.stripe.createToken(this.cardNumber)
    }
  }
}
</script>