<template>
  <div>
    <div v-if="withName" class="c-mt-6">
      <div class="c-w-full c-mt-4">
        <R64FormInput
          v-model="cardholderName"
          label="Cardholder Name"
          :validator="$v.cardholderName"
          :show-error="$v.cardholderName.$error"
          error-message="Cardholder name is required"
          @blur="updateCardholderName"
        />
      </div>
    </div>
    <div class="c-mt-6">
      <label class="c-block">
        <span>Card Number</span>
        <div class="c-relative">
          <span class="c-absolute c-top-0 c-bottom-0 c-left-0 c-px-3 c-flex c-items-center">
              <svg class="c-w-5 c-h-5" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 0H2C.89 0 .01.89.01 2L0 14c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V2c0-1.11-.89-2-2-2zm0 14H2V8h16v6zm0-10H2V2h16v2z" fill="#737373"/></svg>
          </span>
          <div ref="card_number" class="c-mt-2 c-w-full c-h-10 c-px-10 c-rounded c-border c-border-c-gray c-text-base c-focus:outline-none c-focus:border-c-grayer" style="padding-top: 10px"></div>
        </div>
      </label>
      <R64Alert
        class="c-mt-2"
        :visible="cardNumberError !== null"
        :message="cardNumberError"
      />
      <div class="c-mt-2 c-flex c-items-center">
          <span class="c-text-sm">We accept</span>
          <span class="c-ml-2 c-w-8 c-h-5 c-flex c-items-center c-justify-center c-border c-border-c-gray c-rounded-sm">
              <img src="../assets/american_express.png">
          </span>
          <span class="c-ml-2 c-w-8 c-h-5 c-flex c-items-center c-justify-center c-border c-border-c-gray c-rounded-sm">
              <img src="../assets/discover.png">
          </span>
          <span class="c-ml-2 c-w-8 c-h-5 c-flex c-items-center c-justify-center c-border c-border-c-gray c-rounded-sm">
              <img src="../assets/jcb.png">
          </span>
          <span class="c-ml-2 c-w-8 c-h-5 c-flex c-items-center c-justify-center c-border c-border-c-gray c-rounded-sm">
              <img src="../assets/master_card.png">
          </span>
          <span class="c-ml-2 c-w-8 c-h-5 c-flex c-items-center c-justify-center c-border c-border-c-gray c-rounded-sm">
              <img src="../assets/visa.png">
          </span>
      </div>
    </div>
    <div class="c-mt-6 c-flex">
      <div class="c-w-1/2">
        <label class="c-block">
          <span>Expiration Date</span>
          <div ref="card_expiry" class="c-mt-2 c-h-10 c-px-3 c-rounded c-border c-border-c-gray c-text-base c-focus:outline-none c-focus:border-c-grayer" style="padding-top: 10px"></div>
          <R64Alert
            class="c-mt-2"
            :visible="cardExpiryError !== null"
            :message="cardExpiryError"
          />
        </label>
      </div>
      <div class="c-w-1/2 c-ml-4">
        <label class="c-block">
          <span>Security Code</span>
          <div ref="card_cvc" class="c-mt-2 c-h-10 c-px-3 c-rounded c-border c-border-c-gray c-text-base c-focus:outline-none c-focus:border-c-grayer" style="padding-top: 10px"></div>
          <R64Alert
            class="c-mt-2"
            :visible="cardCvcError !== null"
            :message="cardCvcError"
          />
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { injectStripe, createStripe } from '../helpers/stripe'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import R64Alert from './R64Alert'
import R64FormInput from './R64FormInput'

export default {
  props: {
    withName: {
      type: Boolean,
      default: false,
    },

    stripeKey: {
      type: String,
      default: null
    }
  },

  mixins: [validationMixin],

  validations: {
    cardholderName: {
      required,
    },
  },

  components: {
    R64Alert,
    R64FormInput,
  },

  data () {
    return {
      stripe: null,
      cardholderName: null,
      cardNumber: null,
      cardExpiry: null,
      cardCvc: null,
      cardNumberError: null,
      cardExpiryError: null,
      cardCvcError: null
    }
  },

  async mounted () {
    await injectStripe('js.stripe.com/v3/')
    this.stripe = createStripe(this.stripeKey)
    const stripeElements = this.stripe.elements()
    const style = {
      base: {
        fontSize: '16px',
        '::placeholder': {
          color: '#CCCCCC'
        }
      }
    }

    this.cardNumber = stripeElements.create('cardNumber', { style: style })
    this.cardExpiry = stripeElements.create('cardExpiry', { style: style })
    this.cardCvc = stripeElements.create('cardCvc', { style: style })

    this.cardNumber.mount(this.$refs.card_number)
    this.cardExpiry.mount(this.$refs.card_expiry)
    this.cardCvc.mount(this.$refs.card_cvc)

    this.cardNumber.on('change', event => {
      if (!event.complete && event.error) {
        this.cardNumberError = event.error.message
        this.$emit('error:number', event)
      } else {
        this.cardNumberError = null
        this.$emit('complete:number', event)
      }
      this.$emit('change')
    })

    this.cardExpiry.on('change', event => {
      if (!event.complete && event.error) {
        this.cardExpiryError = event.error.message
        this.$emit('error:expiry', event)
      } else {
        this.cardExpiryError = null
        this.$emit('complete:expiry', event)
      }
      this.$emit('change')
    })

    this.cardCvc.on('change', event => {
      if (!event.complete && event.error) {
        this.cardCvcError = event.error.message
        this.$emit('error:cvc', event)
      } else {
        this.cardCvcError = null
        this.$emit('complete:cvc', event)
      }
      this.$emit('change')
    })
  },

  beforeDestroy() {
    this.cardNumber.unmount()
    this.cardExpiry.unmount()
    this.cardCvc.unmount()
  },

  methods: {
    createToken () {
      if (this.withName) {
        return this.stripe.createToken(this.cardNumber, {
          name: this.cardholderName,
        })
      }

      return this.stripe.createToken(this.cardNumber)
    },

    updateCardholderName() {
      
    },
  }
}
</script>