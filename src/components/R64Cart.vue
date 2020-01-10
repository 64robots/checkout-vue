<template>
  <div class="font-sans antialiased z-50 text-c-black" style="box-sizing: border-box;">
    <div class="fixed inset-0 bg-c-black opacity-40">
    </div>
    <div class="absolute top-0 left-0 right-0 flex min-h-screen md:justify-end">
      <div v-if="cart" class="bg-white w-full max-w-4xl p-5 md:p-12">
        <div class="flex justify-between items-center">
          <span class="text-4xl">Your Cart ({{ cart.cart_items.length }})</span>
          <R64CloseButton @click.native="$emit('close')"/>
        </div>
        <R64CartItem :cart-item="cart_item" @cart-item:update="fetchCart" @cart-item:delete="fetchCart" v-for="(cart_item, index) in cart.cart_items" :key="index" />
        <div class="mt-10 pb-10 border-b border-c-gray">
          <button @click="orderNoteVisible = !orderNoteVisible" class="flex items-center">
            <svg class="w-5 h-5 text-c-blue fill-current" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 15.2501V19.0001H3.75L14.81 7.94006L11.06 4.19006L0 15.2501ZM17.71 5.04006C18.1 4.65006 18.1 4.02006 17.71 3.63006L15.37 1.29006C14.98 0.900059 14.35 0.900059 13.96 1.29006L12.13 3.12006L15.88 6.87006L17.71 5.04006Z" fill="#006ED4"/>
            </svg>
            <span class="ml-2 text-c-blue">Add a note about your order (Optional)</span>
          </button>
          <R64TextArea class="mt-10 w-full h-32" v-show="orderNoteVisible" placeholder="Your order note ..." />
        </div>
        <div class="mt-10 flex flex-col items-end">
          <span>Shipping and taxes will be calculated at check out</span>
          <div class="mt-6 w-full justify-between flex items-center md:w-auto">
            <span class="text-xl">Subtotal</span>
            <span class="ml-10 text-4xl">${{ cart.items_subtotal }}</span>
          </div>
          <div class="mt-6 w-full flex flex-col md:w-auto">
            <R64Button :disabled="cart.cart_items.length === 0" @click.native="$emit('checkout')">Checkout</R64Button>
            <span class="mt-4 text-sm">Have a promo code? Apply it at check out.</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import R64CartItem from './R64CartItem'
import R64CloseButton from './R64CloseButton'
import R64TextArea from './R64TextArea'
import R64Button from './R64Button'
import cart from '../api/cart'


export default {
  props: {
    cartToken: {
      type: String,
      default: null
    }
  },

  components: {
    R64CartItem,
    R64CloseButton,
    R64TextArea,
    R64Button
  },

  data () {
    return {
      orderNoteVisible: false,
      cart: null
    }
  },

  async mounted () {
    window.scrollTo(0, 0)
    await this.fetchCart()
  },

  methods: {
    async fetchCart () {
      try {
        if (!this.cartToken) {
          const { data } = await cart.create()
          this.cart = data
        } else {
          const { data } = await cart.get(this.cartToken)
          this.cart = data
        }
      } catch (e) {
        //
      }

      this.$emit('cart:update', this.cart)
    }
  }
}
</script>

<style src="../assets/app.css" scoped>
