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

    paypalClientId: {
      type: String,
      default: null,
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
    await injectPaypal(this.paypalClientId)
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

      onCancel: () => {
        this.$emit('payment:cancel');
      },

      onClick: (data, actions) => {
        this.validator.$touch()

        if (this.validator.$error) {
          this.$nextTick(() => this.focusError(this.$parent.$parent.$parent.$parent))
          return actions.reject()
        }

        this.$emit('payment:open');
        return actions.resolve();
      },

      onApprove: async (data, actions) => {
        // Authorize the transaction
        const authorization = await actions.order.authorize()

        this.$emit('payment:authorized', authorization)
      }
    })
  },
}
</script>