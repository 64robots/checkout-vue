<template>
  <div class="c-space-y-2">
    <div
      :class="{
        'c-border-c-blue': method === 'card',
        'c-border-c-gray-400': method !== 'card'
      }"
      class="c-py-3 c-flex c-items-center c-justify-center c-border c-rounded c-cursor-pointer hover:c-border-c-blue"
      @click="$emit('select', 'card')"
    >
      <span>
        <img class="c-w-10 c-h-10" src="../assets/credit_cards.png" alt="Credit Cards">
      </span>
      <span class="c-ml-2 c-font-medium">Card Payment</span>
    </div>

    <div
      :class="{
        'c-border-c-blue': method === 'paypal',
        'c-border-c-gray-400': method !== 'paypal'
      }"
      class="c-py-3 c-flex c-justify-center c-border c-rounded c-cursor-pointer hover:c-border-c-blue"
      @click="$emit('select', 'paypal')"
    >
      <img src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-150px.png" border="0" alt="Logo PayPal">
    </div>
  </div>
</template>

<script>
export default {
  name: 'R64PaymentPicker',

  props: {
    method: {
      type: String,
      default: null,
    },
  },
}
</script>