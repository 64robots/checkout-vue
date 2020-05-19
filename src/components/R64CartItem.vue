<template>
  <div class="c-flex c-flex-col md:c-flex-row c-mt-10 c-pb-10 c-border-b c-border-c-gray-400">
    <div 
      v-if="hasImage" 
      class="c-w-full c-flex c-items-center c-justify-center md:c-w-40 md:c-h-40 c-bg-c-gray-200 c-flex-shrink-0 cursor-pointer"
      @click="$emit('cart-item:show', cartItem)"
    >
      <img :src="imageSrc" alt="Product image">
    </div>
    <div class="c-mt-4 md:c-ml-6 md:c-mt-0 c-w-full c-flex c-flex-col">
      <div class="c-flex c-justify-between">
        <span @click="$emit('cart-item:show', cartItem)" class="c-text-xl cursor-pointer">{{ cartItem.product.name }}</span>
        <span class="c-text-xl c-font-bold">{{ money(cartItem.price) }}</span>
      </div>

      <R64FormInput
        v-model="localCartItem.customer_note"
        :id="`customer_note_${localCartItem.cart_item_token}`"
        input-class="c-h-10 c-w-full c-max-w-lg c-mt-4 c-px-3 c-rounded c-border c-border-c-gray-400 c-focus:border-c-grayer c-text-base c-focus:outline-none c-focus:border-c-grayer"
        placeholder="Custom note (Optional)"
        @blur="updateCustomerNote"
      />

      <div class="c-flex c-items-center" :class="classes">
        <label :for="`quantity_${localCartItem.cart_item_token}`">Qty</label>
        <R64FormInput
          v-model="localCartItem.quantity"
          :validator="$v.localCartItem.quantity"
          :show-error="$v.localCartItem.quantity.$error"
          :id="`quantity_${localCartItem.cart_item_token}`"
          error-message="Quantity must be a positive number"
          input-class="c-w-10 c-h-8 c-ml-5 c-rounded c-border c-border-c-gray-400 c-focus:outline-none c-focus:border-c-grayer c-text-center"
          alert-class="c-ml-5 c-whitespace-no-wrap"
          @blur="updateQuantity"
        />
        <span class="c-w-px c-h-6 c-ml-5 c-border-l c-border-c-gray-400"></span>
        <button @click="remove" class="c-ml-5">
          <svg class="c-w-5 c-h-5" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 15.9999C1 17.0999 1.9 17.9999 3 17.9999H11C12.1 17.9999 13 17.0999 13 15.9999V3.99994H1V15.9999ZM14 0.999939H10.5L9.5 -6.10352e-05H4.5L3.5 0.999939H0V2.99994H14V0.999939Z" fill="#737373"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import R64FormInput from './R64FormInput'
import cartItem from '../api/cartItem'
import cartItemMixin from '../mixins/cartItem'
import money from '../mixins/money'
import { validationMixin } from 'vuelidate'
import { numeric } from 'vuelidate/lib/validators'

export default {
  mixins: [cartItemMixin, money, validationMixin],

  data () {
    return {
      localCartItem: Object.assign({}, this.cartItem)
    }
  },

  components: {
    R64FormInput
  },

  computed: {
    classes () {
      return this.hasImage ? 'c-mt-4 md:c-mt-auto' : 'c-mt-4 md:c-mt-10'
    }
  },

  watch: {
    cartItem (newCartItem) {
      this.localCartItem = Object.assign({}, newCartItem)
    }
  },

  validations: {
    localCartItem: {
      quantity: {
        numeric,
      }
    }
  },

  methods: {
    async updateQuantity (newQuantity) {
      if (this.$v.localCartItem.quantity.$invalid) {
        return
      }

      try {
        await cartItem.update(this.cartItem.cart_item_token, {
          quantity: newQuantity
        })
      } catch (e) {
        //
      }

      this.$emit('cart-item:update')
    },

    async updateCustomerNote (newCustomerNote) {
      try {
        await cartItem.update(this.cartItem.cart_item_token, {
            customer_note: newCustomerNote
          })
      } catch (e) {
        //
      }
      this.$emit('cart-item:update')
    },

    async remove () {
      try {
        await cartItem.delete(this.cartItem.cart_item_token)
      } catch (e) {
        //
      }

      this.$emit('cart-item:delete')
    }
  }
}
</script>
