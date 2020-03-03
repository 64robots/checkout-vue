<template>
  <div v-if="order" :class="font" class="c-antialiased c-text-c-black c-bg-c-light-gray">
    <div class="c-max-w-2xl c-min-h-screen c-mx-auto c-py-20">
      <R64OrderSection class="c-relative">
        <R64CloseButton class="c-absolute c-right-0 c-top-0 c-pt-8 c-pr-12" @click.native="$emit('close')"/>
        <span class="c-block"></span>
        <span class="c-block c-text-center c-text-4xl c-font-bold c-text-c-blue"><slot name="logo">Logo</slot></span>
        <span class="c-block c-mt-10 c-text-4xl c-font-bold">Thank you for your order!</span>
        <span class="c-block c-mt-4"><slot name="text"></slot></span>
        <span class="c-block c-mt-4">Order Number: {{ order.order_number }}</span>
        <span class="c-block c-mt-2">Order Date: {{ order.created_at }}</span>
        <span class="c-block c-mt-2">Payment Method: {{ order.order_purchase.card_type }} ending in {{ order.order_purchase.card_last4 }}</span>
        <slot name="delivery-date"></slot>
      </R64OrderSection>
      <R64OrderSection class="c-mt-2">
        <span class="c-font-bold c-text-xl">{{ order.order_items.length }} items</span>
        <div class="c-mt-8">
          <R64CartItemPreview 
            v-for="(orderItem, index) in order.order_items" 
            :key="index"
            :currency-symbol="currencySymbol"
            :cart-item="orderItem" 
            class="c-mt-4" 
          />
        </div>
        <div class="c-my-6">
          <div class="c-flex c-justify-between">
            <span>Subtotal</span>
            <span>{{ money(order.items_total) }}</span>
          </div>
          <div v-if="hasCouponCode" class="c-flex c-justify-between c-mt-4">
            <span>Discount</span>
            <span>-{{ money(order.discount) }}</span>
          </div>
          <div v-if="hasTax" class="c-flex c-justify-between c-mt-4">
            <span>Taxes</span>
            <span>{{ money(order.tax) }}</span>
          </div>
          <div v-if="hasShipping" class="c-flex c-justify-between c-mt-4">
            <span>Shipping</span>
            <span>{{ money(order.shipping) }}</span>
          </div>
        </div>
        <R64HorizontalLine />
        <div class="c-flex c-items-center c-justify-between c-mt-6">
          <span class="c-text-xl c-font-bold">Total</span>
          <span class="c-text-xl c-font-bold">{{ money(order.total) }}</span>
        </div>
      </R64OrderSection>
      <R64OrderSection class="c-mt-2">
        <span class="c-font-bold c-text-xl">Shipping Details</span>
        <div class="c-flex c-mt-4">
          <div class="c-w-1/2">
            <span class="c-block c-font-bold">Shipping address</span>
            <span class="c-block c-mt-2">{{ order.shipping_address_line1 }}</span>
            <span class="c-block c-mt-1">{{ order.shipping_address_line2 }}</span>
            <span class="c-block c-mt-1">{{ order.shipping_address_city }}, {{ order.shipping_address_region }}</span>
            <span class="c-block c-mt-1">{{ order.shipping_address_zipcode }}</span>
          </div>
          <div class="c-w-1/2">
            <slot name="shipping-method"></slot>
          </div>
        </div>
      </R64OrderSection>
    </div>
  </div>
</template>

<script>
import R64OrderSection from './R64OrderSection'
import R64CartItemPreview from "./R64CartItemPreview";
import R64CloseButton from './R64CloseButton'
import R64HorizontalLine from './R64HorizontalLine'
import order from '../api/order'
import money from '../mixins/money'
import theme from '../mixins/theme'

export default {
  mixins: [money, theme],

  props: {
    orderToken: {
      type: String,
      default: null
    },
    authToken: {
      type: String,
      default: null
    }
  },

  components: {
    R64CartItemPreview,
    R64OrderSection,
    R64HorizontalLine,
    R64CloseButton,
  },

  data () {
    return {
      order: null
    }
  },

  computed: {
    hasCouponCode () {
      return parseFloat(this.order.discount) !== 0
    },
    hasTax () {
      return parseFloat(this.order.tax) !== 0
    },
    hasShipping () {
      return parseFloat(this.order.shipping) !== 0
    },
  },

  mounted () {
    window.scrollTo(0, 0)
    this.fetchOrder()
  },

  methods: {
    async fetchOrder () {
      try {
        const { data } = await order.get(this.orderToken, this.authToken)
        this.order = data
      } catch (e) {
        //
      }
    }
  }
}
</script>