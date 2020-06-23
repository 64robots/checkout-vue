<template>
  <div>
    <R64Button
      v-bind="$attrs"
      v-if="method === 'card' || isFree"
      @click.native="$emit('order:place')" 
    >
      <span v-if="!busy">Place Order</span>
      <span v-else class="c-inline-block c-w-full c-text-center">
        <span>Placing Order ... </span>
        <R64Spinner class="c-inline-block"/>
      </span>
    </R64Button>
    
    <R64PaypalButton 
      v-if="method === 'paypal' && !isFree"
      :total="total"
      :validator="validator"
      @payment:authorized="$emit('order:place', $event)"
    />
  </div>
</template>

<script>
import R64Button from './R64Button'
import R64Spinner from './R64Spinner'
import R64PaypalButton from './R64PaypalButton'

export default {
  name: 'R64PlaceOrderButton',

  props: {
    busy: {
      type: Boolean,
      default: false,
    },

    method: {
      type: String,
      default: null,
    },

    total: {
      type: String,
      default: null,
    },

    isFree: {
      type: Boolean,
      default: false,
    },

    validator: {
      type: Object,
      default: () => {},
    },
  },

  components: {
    R64Button,
    R64Spinner,
    R64PaypalButton,
  },
}
</script>