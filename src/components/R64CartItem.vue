<template>
  <div class="flex flex-col md:flex-row mt-10 pb-10 border-b border-c-gray">
    <div v-if="hasImage" class="w-full h-40 md:w-40 md:h-40 bg-c-mid-gray flex-shrink-0">
    </div>
    <div class="mt-4 md:ml-6 md:mt-0 w-full flex flex-col">
      <div class="flex justify-between">
        <span class="text-xl">{{ cartItem.product.name }}</span>
        <span class="text-xl font-bold">{{ money(cartItem.price) }}</span>
      </div>

      <R64FormInput
        v-model="cartItem.customer_note"
        :id="`customer_note_${cartItem.cart_item_token}`"
        input-class="h-10 w-full max-w-lg mt-4 px-3 rounded border border-c-gray focus:border-c-grayer text-base focus:outline-none focus:border-c-grayer"
        placeholder="Custom note (Optional)"
        @blur="updateCustomerNote"
      />

      <div class="flex items-center" :class="classes">
        <label :for="`quantity_${cartItem.cart_item_token}`">Qty</label>
        <R64FormInput
          v-model="cartItem.quantity"
          :id="`quantity_${cartItem.cart_item_token}`"
          :validator="$v.cartItem.quantity"
          error-message="Quantity must be a positive number"
          input-class="w-10 h-8 ml-5 rounded border border-c-gray focus:outline-none focus:border-c-grayer text-center"
          alert-class="ml-4"
          @blur="updateQuantity"
        />
        <span class="w-px h-6 ml-5 border-l border-c-gray"></span>
        <button @click="remove" class="ml-5">
          <svg class="w-5 h-5" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 15.9999C1 17.0999 1.9 17.9999 3 17.9999H11C12.1 17.9999 13 17.0999 13 15.9999V3.99994H1V15.9999ZM14 0.999939H10.5L9.5 -6.10352e-05H4.5L3.5 0.999939H0V2.99994H14V0.999939Z" fill="#737373"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import R64FormInput from './R64FormInput2'
import cartItem from '../api/cartItem'
import cartItemMixin from '../mixins/cartItem'
import money from '../mixins/money'
import { validationMixin } from 'vuelidate'
import { numeric } from 'vuelidate/lib/validators'

export default {
  mixins: [cartItemMixin, money, validationMixin],

  components: {
    R64FormInput
  },

  computed: {
    classes () {
      return this.hasImage ? 'mt-4 md:mt-auto' : 'mt-4 md:mt-10'
    }
  },

  validations: {
    cartItem: {
      quantity: {
        numeric,
      }
    }
  },

  methods: {
    async updateQuantity () {
      if (this.$v.cartItem.quantity.$invalid) {
        return
      }

      try {
        await cartItem.update(this.cartItem.cart_item_token, {
          quantity: this.cartItem.quantity
        })
      } catch (e) {
        //
      }

      this.$emit('cart-item:update')
    },

    async updateCustomerNote () {
      try {
        await cartItem.update(this.cartItem.cart_item_token, {
            customer_note: this.cartItem.customer_note
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

<style src="../assets/app.css" scoped>
