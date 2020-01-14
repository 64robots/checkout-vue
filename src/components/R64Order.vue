<template>
  <div v-if="order" class="font-sans antialiased text-c-black bg-c-light-gray">
    <div class="max-w-2xl mx-auto py-20">
      <R64OrderSection>
        <span class="block text-center text-4xl font-bold text-c-blue">Logo</span>
        <span class="block mt-10 text-4xl font-bold">Thank you for your order!</span>
        <span class="block mt-4">Order Number: {{ order.id }}</span>
        <span class="block mt-2">Order Date: {{ order.created_at }}</span>
        <span class="block mt-2">Payment Method: Visa Credit ending in 1234</span>
        <span class="block mt-2 text-c-blue">Delivery Date: Dec, 26 ,2019</span>
      </R64OrderSection>
      <R64OrderSection class="mt-2">
        <span class="font-bold text-xl">{{ order.order_items.length }} items</span>
        <div class="mt-8">
          <R64CartItemPreview :cart-item="orderItem" class="mt-4" v-for="(orderItem, index) in order.order_items" :key="index"/>
        </div>
        <div class="my-6">
          <div class="flex justify-between">
            <span>Subtotal</span>
            <span>{{ money(order.items_total) }}</span>
          </div>
          <div class="flex justify-between mt-4">
            <span>Discount</span>
            <span>-$30</span>
          </div>
          <div class="flex justify-between mt-4">
            <span>Promo</span>
            <span>-$20</span>
          </div>
          <div class="flex justify-between mt-4">
            <span>Taxes</span>
            <span>{{ money(order.tax_total) }}</span>
          </div>
          <div class="flex justify-between mt-4">
            <span>Shipping</span>
            <span>{{ money(order.shipping_total) }}</span>
          </div>
        </div>
        <R64HorizontalLine />
        <div class="flex items-center justify-between mt-6">
          <span class="text-xl font-bold">Total</span>
          <span class="text-xl font-bold">{{ money(order.total) }}</span>
        </div>
      </R64OrderSection>
      <R64OrderSection class="mt-2">
        <span class="font-bold text-xl">Shipping Details</span>
        <div class="flex mt-4">
          <div class="w-1/2">
            <span class="block font-bold">Shipping address</span>
            <span class="block mt-2">{{ order.shipping_address_line1 }}</span>
            <span class="block mt-1">{{ order.shipping_address_line2 }}</span>
            <span class="block mt-1">{{ order.shipping_address_city }}, {{ order.shipping_address_region }}</span>
            <span class="block mt-1">{{ order.shipping_address_zipcode }}</span>
          </div>
          <div class="w-1/2">
            <span class="block font-bold">Shipping method</span>
            <span class="block mt-2">5 business days</span>
            <span class="block mt-1">Get it Saturday Dec 21</span>
          </div>
        </div>
      </R64OrderSection>
    </div>
  </div>
</template>

<script>
import R64OrderSection from './R64OrderSection'
import R64CartItemPreview from "./R64CartItemPreview";
import R64HorizontalLine from './R64HorizontalLine'
import order from '../api/order'
import money from '../mixins/money'

export default {
  mixins: [money],

  props: {
    orderId: {
      type: Number,
      default: null
    }
  },

  components: {
    R64CartItemPreview,
    R64OrderSection,
    R64HorizontalLine
  },

  data () {
    return {
      order: null
    }
  },

  mounted () {
    window.scrollTo(0, 0)
    this.fetchOrder()
  },

  methods: {
    async fetchOrder () {
      try {
        const { data } = await order.get(this.orderId)
        this.order = data
      } catch (e) {
        //
      }
    }
  }
}
</script>

<style src="../assets/app.css">
