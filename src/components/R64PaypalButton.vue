<template>
  <div>
    <div :id="containerId" />
  </div>
</template>

<script>
import { injectPaypal, createPaypal } from '../helpers/paypal'
import errorMixin from '../mixins/error'

export default {
  name: 'R64PaypalButton',

  mixins: [errorMixin],

  props: {
    total: {
      type: String,
      default: null,
    },

    validator: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      hash: Math.random().toString(36).slice(-5),
    }
  },

  computed: {
    containerId() {
      return `paypal_button_${this.hash}`
    },
  },

  async mounted() {
    await injectPaypal('AcA7Oe9gOCeIKCIdrQMNnO8yqdG6k9H9DRsx5NgvtwXR0IY5B5lq0gc2ch75fH3d_2EoZgN7UEGXDDyl')
    createPaypal(`#${this.containerId}`, {
      // Set up the transaction
      createOrder: (data, actions) => {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: this.total
                }
            }]
        });
      },

      onError: (error) => {
        // eslint-disable-next-line no-console
        console.log(error)
      },

      onClick: () => {
        this.validator.$touch()

        if (this.validator.$error) {
          this.$nextTick(() => this.focusError(this.$parent.$parent.$parent.$parent))
          return false
        }
      },

      onApprove: async (data, actions) => {
        // Authorize the transaction
        const authorization = await actions.order.authorize()

        // eslint-disable-next-line no-console
        console.log("##### Authorization ####: ", authorization)

        this.$emit('payment:authorized', authorization)
      }
    })
  },
}
</script>