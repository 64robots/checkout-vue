<template>
  <div 
    v-if="cart" 
    :class="font"
    class="c-text-c-black"
  >
    <div class="c-fixed c-inset-0 c-bg-c-black c-opacity-40">
    </div>
    <div class="c-relative c-w-full c-max-w-lg c-mx-auto c-bg-white c-py-6 c-mt-0 md:c-mt-10 z-10">
      <div class="c-flex c-justify-between c-px-8">
        <span class="c-text-2xl c-font-bold">Checkout</span>
        <button 
          type="button" 
          @click="$emit('cart')" 
          class="c-flex c-items-center"
        >
          <span>
            <svg class="c-w-6 c-h-6 c-stroke-current" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 18L18 6M6 6L18 18" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </button>
      </div>
      
      <div class="c-flex c-mt-6 c-px-8 c-py-6 c-bg-c-light-gray">
        <div>
          <img
            class="c-w-16 c-h-auto"
            :src="cart.cart_items[0].product.image.src" 
            alt="Product image"
          >
        </div>
        <div
          class="c-ml-6 c-flex c-flex-col c-justify-between"
        >
          <span class="c-block c-font-bold">{{ cart.cart_items[0].product.name }}</span>
          <span class="c-block c-text-xl">{{ money(cart.cart_items[0].product.price) }}</span>
        </div>
      </div>

      <div class="c-mt-6 c-px-8 c-pb-8 c-border-b c-border-c-gray">
        <span class="c-block c-font-bold">Account Information</span>
        <div class="c-w-full c-mt-4">
          <R64FormInput
            v-model="form.customer_email"
            label="Email address"
            :validator="$v.form.customer_email"
            :show-error="$v.form.customer_email.$error"
            error-message="Valid email address is required"
            @blur="updateCart('customer_email')"
          />
        </div>
      </div>

      <div class="c-mt-6 c-px-8 c-pb-8 c-border-b c-border-c-gray">
        <span class="c-block c-font-bold">Payment</span>
        <R64StripePayment
          with-name
          ref="stripe"
          :stripe-key="stripeKey"
          :show-card-error="stripeValidated.number"
          :show-expiry-error="stripeValidated.expiry"
          :show-cvc-error="stripeValidated.cvc"
          @complete:number="stripeValidated.number = true"
          @error:number="stripeValidated.number = false"
          @complete:expiry="stripeValidated.expiry = true"
          @error:expiry="stripeValidated.expiry = false"
          @complete:cvc="stripeValidated.cvc = true"
          @error:cvc="stripeValidated.cvc = false"
          @change="paymentErrorVisible = false"
        />
        <R64Alert
          class="c-mt-2"
          :visible="paymentErrorVisible"
          message="Correct payments details are required"
        />
      </div>
    </div>
  </div>
</template>

<script>
import cartItem from '../mixins/cartItem'
import money from '../mixins/money'
import R64Checkout from './R64Checkout'

export default {
  name: 'R64SingleItemCheckout',

  extends: R64Checkout,

  mixins: [money],
}
</script>