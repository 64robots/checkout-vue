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
                :validator="$v.form.customer_email"
                :show-error="$v.form.customer_email.$error"
                error-message="Valid email address is required"
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
                    v-model="form.shipping_first_name"
                    label="First name"
                    :validator="$v.form.shipping_first_name"
                    :show-error="$v.form.shipping_first_name.$error"
                    error-message="First name is required"
                  />
                </div>
                <div class="mt-6">
                  <R64FormInput
                    v-model="form.shipping_last_name"
                    label="Last name"
                    :validator="$v.form.shipping_last_name"
                    :show-error="$v.form.shipping_last_name.$error"
                    error-message="Last name is required"
                  />
                </div>
                <div class="mt-6">
                  <R64FormInput
                    v-model="form.shipping_address_line1"
                    label="Street"
                    :validator="$v.form.shipping_address_line1"
                    :show-error="$v.form.shipping_address_line1.$error"
                    error-message="Street address is required"
                  />
                </div>
                <div class="mt-6">
                  <R64FormInput
                    v-model="form.shipping_address_line2"
                    label="Apartment, suite, etc ..."
                    :validator="$v.form.shipping_address_line2"
                    :show-error="$v.form.shipping_address_line2.$error"
                    error-message="Appartment or suite is required"
                  />
                </div>
                <div class="mt-6 flex">
                  <div class="w-full">
                    <R64FormInput
                      v-model="form.shipping_address_zipcode"
                      label="Zipcode"
                      alert-class="whitespace-no-wrap"
                      :validator="$v.form.shipping_address_zipcode"
                      :show-error="$v.form.shipping_address_zipcode.$error"
                      error-message="Zipcode is required"
                    />
                  </div>
                  <div class="w-full ml-2">
                    <R64FormInput
                      v-model="form.shipping_address_city"
                      label="City"
                      :validator="$v.form.shipping_address_city"
                      :show-error="$v.form.shipping_address_city.$error"
                      error-message="City is required"
                    />
                  </div>
                  <div class="w-full ml-2">
                    <R64FormInput
                      v-model="form.shipping_address_region"
                      label="State"
                      :validator="$v.form.shipping_address_region"
                      :show-error="$v.form.shipping_address_region.$error"
                      error-message="State is required"
                    />
                  </div>
                </div>
                <div class="mt-6">
                  <R64FormInput
                    v-model="form.shipping_address_phone"
                    label="Phone"
                    :validator="$v.form.shipping_address_phone"
                    :show-error="$v.form.shipping_address_phone.$error"
                    error-message="Phone is required"
                  />
                </div>
              </div>
              <div class="mt-6">
                <span class="block text-xl">Shipping method</span>
                <R64ShippingMethods 
                  :methods="shippingMethods" 
                  @change="selectShippingMethod" 
                />
                <R64Alert
                  class="mt-2"
                  :visible="$v.form.shipping_id.$error"
                  message="Select a shipping method"
                />
              </div>
            </div>
          </div>
        </R64CheckoutSection>
        <R64CheckoutSection v-if="!isFree" :border="false">
          <div class="xl:flex mt-6">
            <span class="block text-xl font-bold xl:w-1/3">Payment</span>
            <div class="w-full lg:max-w-sm">
              <span class="mt-6 block text-xl xl:mt-0">Payment method</span>
              <R64StripePayment
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
                class="mt-2"
                :visible="paymentErrorVisible"
                message="Correct payments details are required"
              />
              <div class="mt-6">
                <span class="block text-xl">Billing Address</span>
                <div class="mt-5 w-full flex">
                  <input v-model="billingAddressVisible" type="radio" class="form-radio" id="billing_address_same" :value="false">
                  <label class="ml-3" for="billing_address_same">Same as shipping address</label>
                </div>
                <div class="mt-5 w-full flex">
                  <input v-model="billingAddressVisible" name="billing" type="radio" class="form-radio" id="billing_address_different" :value="true">
                  <label class="ml-3" for="billing_address_different">Use a different billing address</label>
                </div>
              </div>
              <div v-if="billingAddressVisible">
                <div class="mt-6">
                  <R64FormInput
                    v-model="form.billing_first_name"
                    label="First name"
                    :validator="$v.form.billing_first_name"
                    :show-error="$v.form.billing_first_name.$error"
                    error-message="First name is required"
                  />
                </div>
                <div class="mt-6">
                  <R64FormInput
                    v-model="form.billing_last_name"
                    label="Last name"
                    :validator="$v.form.billing_last_name"
                    :show-error="$v.form.billing_last_name.$error"
                    error-message="Last name is required"
                  />
                </div>
                <div class="mt-6">
                  <R64FormInput
                    v-model="form.billing_address_line1"
                    label="Street"
                    :validator="$v.form.billing_address_line1"
                    :show-error="$v.form.billing_address_line1.$error"
                    error-message="Street address is required"
                  />
                </div>
                <div class="mt-6">
                  <R64FormInput
                    v-model="form.billing_address_line2"
                    label="Street"
                    :validator="$v.form.billing_address_line2"
                    :show-error="$v.form.billing_address_line2.$error"
                    error-message="Appartment or suite is required"
                  />
                </div>
                <div class="mt-6 flex">
                  <div class="w-full">
                    <R64FormInput
                      v-model="form.billing_address_zipcode"
                      label="Zipcode"
                      alert-class="whitespace-no-wrap"
                      :validator="$v.form.billing_address_zipcode"
                      :show-error="$v.form.billing_address_zipcode.$error"
                      error-message="Zipcode is required"
                    />
                  </div>
                  <div class="w-full ml-2">
                    <R64FormInput
                      v-model="form.billing_address_city"
                      label="City"
                      :validator="$v.form.billing_address_city"
                      :show-error="$v.form.billing_address_city.$error"
                      error-message="City is required"
                    />
                  </div>
                  <div class="w-full ml-2">
                    <R64FormInput
                      v-model="form.billing_address_region"
                      label="State"
                      :validator="$v.form.billing_address_region"
                      :show-error="$v.form.billing_address_region.$error"
                      error-message="State is required"
                    />
                  </div>
                </div>
                <div class="mt-6">
                  <R64FormInput
                    v-model="form.billing_address_phone"
                    label="Phone"
                    :validator="$v.form.billing_address_phone"
                    :show-error="$v.form.billing_address_phone.$error"
                    error-message="Phone is required"
                  />
                </div>
              </div>
              <div v-if="!hasCouponCode" class="mt-6 lg:hidden">
                <span class="block text-xl">Have a promo code ?</span>
                <R64PromoCode @apply="applyPromoCode" class="mt-5" />
                <R64Alert 
                  :visible="promoCodeErrorVisible"
                  class="mt-2"
                  message="Promo code is not valid"
                />
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
          <div v-if="!hasCouponCode">
            <R64InlinePromoCode @apply="applyPromoCode" class="pt-6"/>
            <R64Alert 
              :visible="promoCodeErrorVisible"
              class="mt-2 mb-4"
              message="Promo code is not valid"
            />
            <R64HorizontalLine />
          </div>
          <div class="my-6">
            <div class="flex justify-between">
              <span>Subtotal</span>
              <span>{{ money(cart.items_subtotal) }}</span>
            </div>
            <div v-if="hasCouponCode" class="flex justify-between mt-4">
              <span>Discount</span>
              <span>- {{ money(cart.discount) }}</span>
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
import R64FormInput from './R64FormInput2'
import R64CheckoutSection from './R64CheckoutSection'
import R64ShippingMethods from './R64ShippingMethods'
import R64Alert from './R64Alert'
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
import { validationMixin } from 'vuelidate'
import { required, email, alpha } from 'vuelidate/lib/validators'

export default {
  mixins: [cartMixin, money, validationMixin],

  props: {
    customerEmail: {
      type: String,
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
    R64ShippingMethods,
    R64CheckoutSection,
    R64InlinePromoCode,
    R64PromoCode,
    R64HorizontalLine,
    R64StripePayment,
    R64Alert
  },

  data () {
    return {
      itemSummaryVisible: false,
      billingAddressVisible: false,
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
        billing_first_name: null,
        billing_last_name: null,
        billing_address_line1: null,
        billing_address_line2: null,
        billing_address_zipcode: null,
        billing_address_city: null,
        billing_address_region: null,
        billing_address_phone: null,
      },
      stripeValidated: {
        number: false,
        expiry: false,
        cvc: false
      },
      paymentErrorVisible: false,
      promoCodeErrorVisible: false,
      settings: null,
      selectedShippingMethod: null,
      consent: false,
      total: '0.00'
    }
  },

  validations () {
    const requiredFields = {
      customer_email: { email },
      shipping_id: { required },
      shipping_first_name: {},
      shipping_last_name: {},
      shipping_address_line1: {},
      shipping_address_line2: {},
      shipping_address_city: {},
      shipping_address_region: {},
      shipping_address_zipcode: {},
      shipping_address_phone: {},
      billing_first_name: {},
      billing_last_name: {},
      billing_address_line1: {},
      billing_address_line2: {},
      billing_address_zipcode: {},
      billing_address_city: {},
      billing_address_region: {},
      billing_address_phone: {}
    }

    Object.keys(this.settings.required)
      .forEach((field) => {
        if (this.settings.required[field]) {
          requiredFields[field] = { ...requiredFields[field], required }
        } else {
          requiredFields[field] = { ...requiredFields[field] }
        }
      })

    return {
      form: {
        ...requiredFields
      }
    }
  },

  async mounted () {
    window.scrollTo(0, 0)
    
    await this.fetchSettings()
    await this.fetchCart()
    await this.fetchTotal()

    this.form.customer_email = this.customerEmail
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
    },
    
    stripeAllValidated () {
      if (this.isFree) {
        return true
      }

      return this.stripeValidated.number && this.stripeValidated.expiry && this.stripeValidated.cvc
    },

    billingAllValidated () {
      return !this.$v.form.billing_first_name.$invalid
        && !this.$v.form.billing_last_name.$invalid
        && !this.$v.form.billing_address_line1.$invalid
        && !this.$v.form.billing_address_line2.$invalid
        && !this.$v.form.billing_address_zipcode.$invalid
        && !this.$v.form.billing_address_city.$invalid
        && !this.$v.form.billing_address_region.$invalid
        && !this.$v.form.billing_address_phone.$invalid
    },

    hasCouponCode () {
      return this.cart ? this.cart.has_coupon_code : false
    },

    isFree () {
      return parseFloat(this.total) === 0
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

    async applyPromoCode (couponCode) {
      try {
        await cart.update(this.cartToken, couponCode)
        this.fetchCart()
        this.fetchTotal()
      } catch (e) {
        this.promoCodeErrorVisible = true
      }
    },

    formValid () {
      this.$v.$touch()

      if (!this.stripeAllValidated) {
        this.paymentErrorVisible = true
      }

      if (!this.billingAllValidated) {
        this.billingAddressVisible = true
      }

      if (!this.$v.$invalid && this.stripeAllValidated) {
        this.paymentErrorVisible = false

        return true
      }

      return false
    },

    async createOrder () {
      if (!this.formValid()) {
        return
      }

      if (this.isFree) {
        const { data } = await order.create({
          order: {
            cart_token: this.cartToken,
            customer_notes: this.customerNotes,
            ...this.form
          },
          auth_token: this.authToken
        })
        this.$emit('order:create', data)

        return
      }

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
    },

    billingAddressVisible (newIsVisible) {
      if (newIsVisible) {
        this.form.billing_first_name = null
        this.form.billing_last_name = null
        this.form.billing_address_line1 = null
        this.form.billing_address_line2 = null
        this.form.billing_address_zipcode = null
        this.form.billing_address_city = null
        this.form.billing_address_region = null
        this.form.billing_address_phone = null
      } else {
        this.form.billing_first_name = this.form.shipping_first_name
        this.form.billing_last_name = this.form.shipping_last_name
        this.form.billing_address_line1 = this.form.shipping_address_line1
        this.form.billing_address_line2 = this.form.shipping_address_line2
        this.form.billing_address_zipcode = this.form.shipping_address_zipcode
        this.form.billing_address_city = this.form.shipping_address_city
        this.form.billing_address_region = this.form.shipping_address_region
        this.form.billing_address_phone = this.form.shipping_address_phone
      }
    },

    'form.shipping_first_name': function (newValue) {
      if (!this.billingAddressVisible) {
        this.form.billing_first_name = newValue
      }
    },

    'form.shipping_last_name': function (newValue) {
      if (!this.billingAddressVisible) {
        this.form.billing_last_name = newValue
      }
    },

    'form.shipping_address_line1': function (newValue) {
      if (!this.billingAddressVisible) {
        this.form.billing_address_line1 = newValue
      }
    },

    'form.shipping_address_line2': function (newValue) {
      if (!this.billingAddressVisible) {
        this.form.billing_address_line2 = newValue
      }
    },

    'form.shipping_address_zipcode': function (newValue) {
      if (!this.billingAddressVisible) {
        this.form.billing_address_zipcode = newValue
      }
    },

    'form.shipping_address_city': function (newValue) {
      if (!this.billingAddressVisible) {
        this.form.billing_address_city = newValue
      }
    },

    'form.shipping_address_region': function (newValue) {
      if (!this.billingAddressVisible) {
        this.form.billing_address_region = newValue
      }
    },

    'form.shipping_address_phone': function (newValue) {
      if (!this.billingAddressVisible) {
        this.form.billing_address_phone = newValue
      }
    }
  }
}
</script>

<style src="../assets/app.css">
