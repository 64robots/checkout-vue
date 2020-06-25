<template>
  <div>
    <R64Button
      v-bind="$attrs"
      :disabled="disabled"
      v-if="method === 'card' || isFree"
      @click.native="$emit('order:place')" 
    >
      <span v-if="!busy">Place Order</span>
      <span v-else class="c-inline-block c-w-full c-text-center">
        <span>Placing Order ... </span>
        <R64Spinner class="c-inline-block"/>
      </span>
    </R64Button>
    
    <div class="c-relative">
      <!-- When consent is false disabled is true and paypal button is disabled :) -->
      <div 
        v-if="disabled" 
        class="c-absolute c-inset-0 c-opacity-25 c-bg-gray-600 c-z-50 c-rounded" 
        style="margin-bottom: 6px;"
      />

      <div
        v-if="busy && method === 'paypal'"
        class="c-absolute c-inset-0 c-z-50 c-rounded" 
        style="margin-bottom: 6px;"
      >
        <R64Button
          :disabled="true"
          class="c-w-full c-h-full"
        >
          <span class="c-inline-block c-w-full c-text-center">
            <span>Placing Order ... </span>
            <R64Spinner class="c-inline-block"/>
          </span>
        </R64Button>
      </div>

      <R64PaypalButton
        v-if="method === 'paypal' && !isFree"
        :total="totalCents / 100"
        :validator="validator"
        :paypal-client-id="paypalClientId"
        @payment:open="$emit('paypal:open')"
        @payment:authorized="$emit('order:place', $event)"
        @payment:cancel="$emit('paypal:cancel')"
        @payment:error="$emit('paypal:error')"
        class="c-relative c-z-10"
      />
    </div>

    <R64Alert
      v-if="error"
      class="c-mt-2"
      message="There was a problem with your payment. Please try again."
    />
  </div>
</template>

<script>
import R64Button from './R64Button'
import R64Spinner from './R64Spinner'
import R64PaypalButton from './R64PaypalButton'
import R64Alert from './R64Alert'

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

    totalCents: {
      type: Number,
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

    disabled: {
      type: Boolean,
      default: true,
    },

    paypalClientId: {
      type: String,
      default: null,
    },

    error: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    R64Button,
    R64Spinner,
    R64PaypalButton,
    R64Alert,
  },
}
</script>