<template>
  <div class="font-sans antialiased text-c-black bg-c-light-gray" style="box-sizing: border-box;">
    <div class="checkout-cart-items fixed p-5 top-0 left-0 right-0 z-10 bg-white lg:hidden">
      <div class="flex items-center justify-between">
        <span class="text-xl">Total to pay ({{ cartItems.length }} items)</span>
        <span class="text-xl font-bold">{{ money(total) }}</span>
      </div>

      <div v-show="itemSummaryVisible" class="mt-10">
        <R64CartItemPreview 
          v-for="(cartItem, index) in cartItems" 
          :key="index" 
          :cart-item="cartItem" 
          :border="index !== cartItems.length - 1" 
          class="mt-4"
        />
      </div>

      <button @click="itemSummaryVisible = !itemSummaryVisible" class="flex items-center justify-between w-full mt-2">
        <span class="text-c-blue">{{ itemSummaryText }}</span>
        <span :class="{ 'rotate-1/2': itemSummaryVisible }">
          <svg class="w-3 h-3 fill-current" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.41 0.0380859L6 3.86986L10.59 0.0380859L12 1.21774L6 6.23753L0 1.21774L1.41 0.0380859Z" fill="#006ED4"/>
          </svg>
        </span>
      </button>
    </div>

    <div v-if="settings" class="lg:flex lg:mx-auto lg:max-w-7xl">
      <div class="checkout-form w-full mt-24 bg-white lg:flex-shrink-0 lg:max-w-2xl lg:mt-0 xl:max-w-4xl">
        <R64CheckoutSection>
          <button type="button" @click="$emit('cart')" class="text-c-blue flex items-center">
            <span><svg class="w-3 h-3" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.41 10.59L2.83 6l4.58-4.59L6 0 0 6l6 6 1.41-1.41z" fill="#006ED4"/></svg></span>
            <span class="ml-3">Back to cart</span>
          </button>
          <h2 class="mt-3 text-3xl">Check Out</h2>
          <div class="xl:flex mt-6">
            <span class="block text-xl font-bold xl:w-1/3">Contact</span>
            <div class="w-full mt-6 lg:max-w-sm xl:mt-0">
              <R64FormInput
                v-model="form.customer_email"
                label="Email address"
                name="customer_email"
                :required="settings.required.customer_email"
              />
            </div>
          </div>
        </R64CheckoutSection>
        <R64CheckoutSection>
          <div class="xl:flex mt-6">
            <span class="block text-xl font-bold xl:w-1/3">Shipping</span>
            <div class="w-full lg:max-w-sm">
              <span class="mt-6 block text-xl xl:mt-0">Shipping Address</span>
              <div>
                <div class="mt-6">
                  <R64FormInput
                    v-model="form.shipping_address_line1"
                    label="Street"
                    name="shipping_address_line1"
                    :required="settings.required.shipping_address_line1"
                  />
                </div>
                <div class="mt-6">
                  <R64FormInput
                    v-model="form.shipping_address_line2"
                    label="Apartment, suite, etc ..."
                    name="shipping_address_line2"
                    :required="settings.required.shipping_address_line2"
                  />
                </div>
                <div class="mt-6 flex">
                  <div class="w-full">
                    <R64FormInput
                      v-model="form.shipping_address_zipcode"
                      label="Zipcode"
                      name="shipping_address_zipcode"
                      :required="settings.required.shipping_address_zipcode"
                    />
                  </div>
                  <div class="w-full ml-2">
                    <R64FormInput
                      v-model="form.shipping_address_city"
                      label="City"
                      name="shipping_address_city"
                      :required="settings.required.shipping_address_city"
                    />
                  </div>
                  <div class="w-full ml-2">
                    <R64FormInput
                      v-model="form.shipping_address_region"
                      label="State"
                      name="shipping_address_region"
                      :required="settings.required.shipping_address_region"
                    />
                  </div>
                </div>
                <div class="mt-6">
                  <R64FormInput
                    v-model="form.shipping_address_phone"
                    label="Phone"
                    name="shipping_address_phone"
                    :required="settings.required.shipping_address_phone"
                  />
                </div>
              </div>
              <div class="mt-6">
                <span class="block text-xl">Shipping method</span>
                <R64ShippingMethods :methods="shippingMethods" @change="selectShippingMethod" />
              </div>
            </div>
          </div>
        </R64CheckoutSection>
        <R64CheckoutSection :border="false">
          <div class="xl:flex mt-6">
            <span class="block text-xl font-bold xl:w-1/3">Payment</span>
            <div class="w-full lg:max-w-sm">
              <span class="mt-6 block text-xl xl:mt-0">Payment method</span>
              <R64StripePayment ref="stripe" :stripe-key="stripeKey" />              
              <div class="mt-6">
                <span class="block text-xl">Billing Address</span>
                <div class="mt-5 w-full flex">
                  <input v-model="billingAddressDifferent" name="shipping" type="radio" class="form-radio" id="billing_address_same" :value="false">
                  <label class="ml-3" for="billing_address_same">Same as shipping address</label>
                </div>
                <div class="mt-5 w-full flex">
                  <input v-model="billingAddressDifferent" name="shipping" type="radio" class="form-radio" id="billing_address_different" :value="true">
                  <label class="ml-3" for="billing_address_different">Use a different billing address</label>
                </div>
              </div>
              <div v-if="billingAddressDifferent">
                <div class="mt-6">
                  <R64FormInput
                    v-model="form.billing_address_line1"
                    label="Street"
                    name="billing_address_line1"
                    :required="settings.required.billing_address_line1"
                  />
                </div>
                <div class="mt-6">
                  <R64FormInput
                    v-model="form.billing_address_line2"
                    label="Apartment, suite, etc ..."
                    name="billing_address_line2"
                    :required="settings.required.billing_address_line2"
                  />
                </div>
                <div class="mt-6 flex">
                  <div class="w-full">
                    <R64FormInput
                      v-model="form.billing_address_zipcode"
                      label="Zipcode"
                      name="billing_address_zipcode"
                      :required="settings.required.billing_address_zipcode"
                    />
                  </div>
                  <div class="w-full ml-2">
                    <R64FormInput
                      v-model="form.billing_address_city"
                      label="City"
                      name="billing_address_city"
                      :required="settings.required.billing_address_city"
                    />
                  </div>
                  <div class="w-full ml-2">
                    <R64FormInput
                      v-model="form.billing_address_region"
                      label="State"
                      name="billing_address_region"
                      :required="settings.required.billing_address_region"
                    />
                  </div>
                </div>
                <div class="mt-6">
                  <R64FormInput
                    v-model="form.billing_address_phone"
                    label="Phone"
                    name="billing_address_phone"
                    :required="settings.required.billing_address_phone"
                  />
                </div>
              </div>
              <div class="mt-6 lg:hidden">
                <span class="block text-xl">Have a promo code ?</span>
                <R64PromoCode @apply="applyPromoCode" class="mt-5" />
              </div>
            </div>
          </div>
        </R64CheckoutSection>
        <div class="pt-12 pl-5 pr-6 pb-8 lg:hidden border-t border-c-gray">
          <div class="flex items-start">
            <input type="checkbox" class="form-checkbox">
            <span class="ml-3 -mt-1 align-top">I have read and understood, and accept our <a :href="tocUrl" class="text-c-blue hover:underline">Terms and Conditions, Return Policy, and Privacy Policy</a>.</span>
          </div>
          <R64Button @click.native="createOrder" class="mt-6 w-full">Place Order</R64Button>
        </div>
      </div>
      <div class="hidden w-full lg:block lg:px-8 lg:pt-12 xl:px-16">
        <div v-if="cart" class="lg:max-w-sm">
          <R64CartItemPreview 
            v-for="(cartItem, index) in cartItems" 
            :key="index" 
            :cart-item="cartItem" 
            class="mt-4"
          />
          <R64InlinePromoCode @apply="applyPromoCode" class="py-6"/>
          <R64HorizontalLine />
          <div class="my-6">
            <div class="flex justify-between">
              <span>Subtotal</span>
              <span>{{ money(cart.items_subtotal) }}</span>
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
              <span>{{ money(cart.tax) }}</span>
            </div>
            <div v-if="selectedShippingMethod" class="flex justify-between mt-4">
              <span>Shipping</span>
              <span>{{ money(selectedShippingMethod.price) }}</span>
            </div>
          </div>
          <R64HorizontalLine />
          <div class="flex items-center justify-between my-6">
            <span class="text-xl font-bold">Total to Pay</span>
            <span class="text-4xl">{{ money(total) }}</span>
          </div>
          <div class="flex items-start">
            <input v-model="consent" type="checkbox" class="form-checkbox">
            <span class="ml-3 -mt-1 align-top">I have read and understood, and accept our <a :href="tocUrl" class="text-c-blue hover:underline">Terms and Conditions, Return Policy, and Privacy Policy</a>.</span>
          </div>
          <R64Button @click.native="createOrder" class="mt-6" :disabled="!consent">Place Order</R64Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import R64CartItemPreview from './R64CartItemPreview'
import R64FormInput from './R64FormInput'
// import R64CardNumberInput from "./R64CardNumberInput"
import R64CheckoutSection from './R64CheckoutSection'
import R64ShippingMethods from './R64ShippingMethods'
import R64PromoCode from "./R64PromoCode"
import R64Button from "./R64Button"
import R64InlinePromoCode from './R64InlinePromoCode'
import R64HorizontalLine from './R64HorizontalLine'
import R64StripePayment from './R64StripePayment'
import cartMixin from '../mixins/cart'
import money from '../mixins/money'
import cart from '../api/cart'
import checkout from '../api/checkout'
import order from '../api/order'

export default {
  mixins: [cartMixin, money],

  props: {
    customerId: {
      type: Number,
      default: null
    },
    customerNotes: {
      type: String,
      default: null
    },
    stripeKey: {
      type: String,
      default: null
    },
    authToken: {
      type: String,
      default: null
    }
  },

  components: {
    R64Button,
    R64CartItemPreview,
    R64FormInput,
    // R64CardNumberInput,
    R64ShippingMethods,
    R64CheckoutSection,
    R64InlinePromoCode,
    R64PromoCode,
    R64HorizontalLine,
    R64StripePayment
  },

  data () {
    return {
      itemSummaryVisible: false,
      billingAddressDifferent: false,
      form: {
        customer_email: null,
        shipping_id: null,
        shipping_first_name: null,
        shipping_last_name: null,
        shipping_address_line1: null,
        shipping_address_line2: null,
        shipping_address_city: null,
        shipping_address_region: null,
        shipping_address_zipcode: null,
        shipping_address_phone: null,
        billing_address_line1: null,
        billing_address_line2: null,
        billing_address_city: null,
        billing_address_region: null,
        billing_address_zipcode: null,
        billing_address_phone: null,
      },
      settings: null,
      selectedShippingMethod: null,
      consent: false,
      total: '0.00'
    }
  },

  async mounted () {
    window.scrollTo(0, 0)
    
    await this.fetchSettings()
    await this.fetchCart()
    await this.fetchTotal()
  },

  computed: {
    itemSummaryText () {
      return this.itemSummaryVisible ? 'Hide item summary' : 'Show item summary'
    },
    shippingMethods () {
      return this.settings ? this.settings.shipping_methods : []
    },
    tocUrl () {
      return this.settings ? this.settings.toc_url : '#'
    }
  },

  methods: {
    async fetchSettings () {
      try {
        const { data } = await checkout.settings()
        this.settings = data
      } catch (e) {
        //
      }
    },

    async fetchTotal () {
      const shippingMethodId = this.selectedShippingMethod ? this.selectedShippingMethod.id : null

      const { data } = await cart.getTotal(this.cartToken, shippingMethodId)
      this.total = data.total
    },

    async applyPromoCode (promoCode) {
      /* eslint-disable no-console */
      console.log(promoCode)
      /* eslint-disable no-console */
    },

    async createOrder () {
      try {
        const { token } = await this.$refs.stripe.createToken()
        const { data } = await order.create({
          stripe: {
            token: token.id
          },
          order: {
            cart_token: this.cartToken,
            customer_notes: this.customerNotes,
            ...this.form
          },
          auth_token: this.authToken
        })
        this.$emit('order:create', data)
      } catch (e) {
        //
      }
    },

    selectShippingMethod (method) {
      this.selectedShippingMethod = method
      this.form.shipping_id = method.id
    },
  },

  watch: {
    selectedShippingMethod () {
      this.fetchTotal()
    }
  }
}
</script>

<style src="../assets/app.css">
