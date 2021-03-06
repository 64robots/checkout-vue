<template>
  <div :class="font" class="c-antialiased c-z-50 c-text-c-gray-700" style="box-sizing: border-box;">
    <div class="c-fixed c-inset-0 c-bg-c-gray-700 c-opacity-40">
    </div>
    <div v-if="cart" class="c-absolute c-top-0 c-left-0 c-right-0 c-flex c-min-h-screen md:c-justify-end">
      <div class="c-bg-white c-w-full c-max-w-4xl c-p-5 md:c-p-12">
        <div class="c-flex c-justify-between c-items-center">
          <span class="c-text-4xl">Your Cart ({{ cartItems.length }})</span>
          <R64CloseButton @click.native="$emit('close')"/>
        </div>
        <R64CartItem
          v-for="(cartItem, index) in cartItems"
          :key="index"
          :cart-item="cartItem"
          :currency-symbol="currencySymbol"
          @cart-item:update="fetchCart"
          @cart-item:delete="fetchCart"
          @cart-item:show="cartItem => $emit('cart-item:show', cartItem)"
        />
        <div class="c-mt-10 c-pb-10 c-border-b c-border-c-gray-400">
          <button @click="toggleNote" class="c-flex c-items-center">
            <svg :class="iconColor" class="c-w-5 c-h-5 c-fill-current" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 15.2501V19.0001H3.75L14.81 7.94006L11.06 4.19006L0 15.2501ZM17.71 5.04006C18.1 4.65006 18.1 4.02006 17.71 3.63006L15.37 1.29006C14.98 0.900059 14.35 0.900059 13.96 1.29006L12.13 3.12006L15.88 6.87006L17.71 5.04006Z"/>
            </svg>
            <span :class="textPrimary" class="c-ml-2">Add a note about your order (Optional)</span>
          </button>
          <R64TextArea
            v-if="orderNoteVisible"
            :value="cart.customer_notes"
            class="c-mt-10 c-w-full c-h-32"
            placeholder="Your order note ..."
            @blur="setCustomerNote"
          />
        </div>
        <div class="c-mt-10 c-flex c-flex-col">
          <div>
            <slot name="below-note"></slot>
          </div>
          <div class="c-ml-auto c-flex c-flex-col c-items-end">
            <span>Shipping and taxes will be calculated at check out</span>
            <div class="c-mt-6 c-w-full c-justify-between c-flex c-items-center md:c-w-auto">
              <span class="c-text-xl">Subtotal</span>
              <span class="c-ml-10 c-text-4xl">{{ money(cart.items_subtotal) }}</span>
            </div>
            <div class="c-mt-6 c-w-full c-flex c-flex-col md:c-w-auto">
              <R64Button
                :btn-primary="btnPrimary"
                :disabled="cart.cart_items.length === 0"
                @click.native="checkout"
              >
                Checkout
              </R64Button>
              <slot name="extra-buttons" />
              <span class="c-mt-4 c-text-sm">Have a promo code? Apply it at check out.</span>
            </div>
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
import cartMixin from '../mixins/cart'
import money from '../mixins/money'
import theme from '../mixins/theme'

export default {
  mixins: [cartMixin, money, theme],

  components: {
    R64CartItem,
    R64CloseButton,
    R64TextArea,
    R64Button
  },

  data () {
    return {
      orderNoteVisible: false,
    }
  },

  async mounted () {
    window.scrollTo(0, 0)
    await this.fetchCart()
  },

  methods: {
    async setCustomerNote (customerNote) {
      try {
        const { data } = await cart.update(this.cartToken, {
          customer_notes: customerNote
        })
        this.cart = data
      } catch (e) {
        //
      }

      this.$emit('cart:update', this.cart)
    },

    toggleNote () {
      this.orderNoteVisible = !this.orderNoteVisible

      if (!this.orderNoteVisible) {
        this.setCustomerNote(null)
      }
    },

    checkout () {
      this.$emit('checkout')
    }
  },

  watch: {
    'cart.customer_notes' (newCustomerNotes) {
      this.orderNoteVisible = !!newCustomerNotes
    }
  }
}
</script>
