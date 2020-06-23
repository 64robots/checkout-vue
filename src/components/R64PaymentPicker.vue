<template>
  <div>
    <div id="paypal_button" />
  </div>
</template>

<script>
import { injectPaypal, createPaypal } from '../helpers/paypal'

export default {
  name: 'R64PaymentPicker',

  async mounted() {
    await injectPaypal('AcA7Oe9gOCeIKCIdrQMNnO8yqdG6k9H9DRsx5NgvtwXR0IY5B5lq0gc2ch75fH3d_2EoZgN7UEGXDDyl')
    createPaypal('#paypal_button')
  },
}
</script>