<template>
  <div v-if="cart" :class="font" class="c-antialiased c-text-c-black c-bg-c-light-gray" style="box-sizing: border-box;">
    <div class="checkout-cart-items c-fixed c-p-5 c-top-0 c-left-0 c-right-0 c-z-10 c-bg-white lg:c-hidden">
      <div class="c-flex c-items-center c-justify-between">
        <span class="c-text-xl">Total to pay ({{ cartItems.length }} items)</span>
        <span class="c-text-xl c-font-bold">{{ money(cart.total) }}</span>
      </div>

      <div v-show="itemSummaryVisible" class="c-mt-10">
        <R64CartItemPreview
          v-for="(cartItem, index) in cartItems"
          :key="index"
          :cart-item="cartItem"
          :currency-symbol="currencySymbol"
          :border="index !== cartItems.length - 1"
          class="c-mt-4"
        />
      </div>

      <button @click="itemSummaryVisible = !itemSummaryVisible" class="c-flex c-items-center c-justify-between c-w-full c-mt-2">
        <span class="c-text-c-blue">{{ itemSummaryText }}</span>
        <span :class="{ 'c-rotate-1/2': itemSummaryVisible }">
          <svg class="c-w-3 c-h-3 c-fill-current" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.41 0.0380859L6 3.86986L10.59 0.0380859L12 1.21774L6 6.23753L0 1.21774L1.41 0.0380859Z" fill="#006ED4"/>
          </svg>
        </span>
      </button>
    </div>

    <div v-if="settings" class="c-min-h-screen lg:c-flex lg:c-mx-auto lg:c-max-w-7xl">
      <div class="checkout-form c-w-full c-mt-24 c-bg-white lg:c-flex-shrink-0 lg:c-max-w-2xl lg:c-mt-0 xl:c-max-w-4xl">
        <R64CheckoutSection>
          <button type="button" @click="$emit('cart')" class="c-text-c-blue c-flex c-items-center">
            <span><svg class="c-w-3 c-h-3" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.41 10.59L2.83 6l4.58-4.59L6 0 0 6l6 6 1.41-1.41z" fill="#006ED4"/></svg></span>
            <span class="c-ml-3">Back to cart</span>
          </button>
          <h2 class="c-mt-3 c-text-3xl">Check Out</h2>
          <div class="xl:c-flex c-mt-6">
            <span class="c-block c-text-xl c-font-bold xl:c-w-1/3">Contact</span>
            <div class="c-w-full c-mt-6 lg:c-max-w-sm xl:c-mt-0">
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
        </R64CheckoutSection>
        <R64CheckoutSection>
          <div class="xl:c-flex c-mt-6">
            <span class="c-block c-text-xl c-font-bold xl:c-w-1/3">Shipping</span>
            <div class="c-w-full lg:c-max-w-sm">
              <span class="c-mt-6 c-block c-text-xl xl:c-mt-0">Shipping Address</span>
              <div>
                <div class="c-mt-6">
                  <R64FormInput
                    v-model="form.shipping_first_name"
                    label="First name"
                    :validator="$v.form.shipping_first_name"
                    :show-error="$v.form.shipping_first_name.$error"
                    error-message="First name is required"
                    @blur="updateCart('shipping_first_name')"
                  />
                </div>
                <div class="c-mt-6">
                  <R64FormInput
                    v-model="form.shipping_last_name"
                    label="Last name"
                    :validator="$v.form.shipping_last_name"
                    :show-error="$v.form.shipping_last_name.$error"
                    error-message="Last name is required"
                    @blur="updateCart('shipping_last_name')"
                  />
                </div>
                <div class="c-mt-6">
                  <R64FormInput
                    v-model="form.shipping_address_line1"
                    label="Street"
                    :validator="$v.form.shipping_address_line1"
                    :show-error="$v.form.shipping_address_line1.$error"
                    error-message="Street address is required"
                    @blur="updateCart('shipping_address_line1')"
                  />
                </div>
                <div class="c-mt-6">
                  <R64FormInput
                    v-model="form.shipping_address_line2"
                    label="Apartment, suite, etc ..."
                    :validator="$v.form.shipping_address_line2"
                    :show-error="$v.form.shipping_address_line2.$error"
                    error-message="Appartment or suite is required"
                    @blur="updateCart('shipping_address_line2')"
                  />
                </div>
                <div class="c-mt-6 c-flex">
                  <div class="c-w-full">
                    <R64FormInput
                      v-model="form.shipping_address_zipcode"
                      label="Zipcode"
                      alert-class="whitespace-no-wrap"
                      :validator="$v.form.shipping_address_zipcode"
                      :show-error="$v.form.shipping_address_zipcode.$error"
                      error-message="Zipcode is required"
                      @blur="updateCartZipCode"
                    />
                  </div>
                  <div class="c-w-full c-ml-2">
                    <R64FormInput
                      v-model="form.shipping_address_city"
                      label="City"
                      :validator="$v.form.shipping_address_city"
                      :show-error="$v.form.shipping_address_city.$error"
                      error-message="City is required"
                      @blur="updateCart('shipping_address_city')"
                    />
                  </div>
                  <div class="c-w-full c-ml-2">
                    <R64FormSelect
                      v-model="form.shipping_address_region"
                      label="State"
                      placeholder="Select state"
                      :options="settings.states"
                      :validator="$v.form.shipping_address_region"
                      :show-error="$v.form.shipping_address_region.$error"
                      error-message="State is required"
                      @change="updateCart('shipping_address_region')"
                    />
                  </div>
                </div>
                <div class="c-mt-6">
                  <R64FormInput
                    v-model="form.shipping_address_phone"
                    label="Phone"
                    :validator="$v.form.shipping_address_phone"
                    :show-error="$v.form.shipping_address_phone.$error"
                    error-message="Phone is required"
                    @blur="updateCart('shipping_address_phone')"
                  />
                </div>
              </div>

              <slot name="shipping">
              </slot>

            </div>
          </div>
        </R64CheckoutSection>
        <R64CheckoutSection v-if="!isFree" :border="false">
          <div class="xl:c-flex c-mt-6">
            <span class="c-block c-text-xl c-font-bold xl:c-w-1/3">Payment</span>
            <div class="c-w-full lg:c-max-w-sm">
              <span class="c-mt-6 c-block c-text-xl xl:c-mt-0">Payment method</span>
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
                class="c-mt-2"
                :visible="paymentErrorVisible"
                message="Correct payments details are required"
              />
              <div class="c-mt-6">
                <span class="c-block c-text-xl">Billing Address</span>
                <div class="c-mt-5 c-w-full c-flex">
                  <input v-model="form.billing_same" type="radio" class="c-form-radio" id="billing_address_same" :value="true" @change="updateCart('billing_same')">
                  <label class="c-ml-3" for="billing_address_same">Same as shipping address</label>
                </div>
                <div class="c-mt-5 c-w-full c-flex">
                  <input v-model="form.billing_same" name="billing" type="radio" class="c-form-radio" id="billing_address_different" :value="false" @change="updateCart('billing_same')">
                  <label class="c-ml-3" for="billing_address_different">Use a different billing address</label>
                </div>
              </div>
              <div v-if="!form.billing_same">
                <div class="c-mt-6">
                  <R64FormInput
                    v-model="form.billing_first_name"
                    label="First name"
                    :validator="$v.form.billing_first_name"
                    :show-error="$v.form.billing_first_name.$error"
                    error-message="First name is required"
                    @blur="updateCart('billing_first_name')"
                  />
                </div>
                <div class="c-mt-6">
                  <R64FormInput
                    v-model="form.billing_last_name"
                    label="Last name"
                    :validator="$v.form.billing_last_name"
                    :show-error="$v.form.billing_last_name.$error"
                    error-message="Last name is required"
                    @blur="updateCart('billing_last_name')"
                  />
                </div>
                <div class="c-mt-6">
                  <R64FormInput
                    v-model="form.billing_address_line1"
                    label="Street"
                    :validator="$v.form.billing_address_line1"
                    :show-error="$v.form.billing_address_line1.$error"
                    error-message="Street address is required"
                    @blur="updateCart('billing_address_line1')"
                  />
                </div>
                <div class="c-mt-6">
                  <R64FormInput
                    v-model="form.billing_address_line2"
                    label="Apartment, suite, etc ..."
                    :validator="$v.form.billing_address_line2"
                    :show-error="$v.form.billing_address_line2.$error"
                    error-message="Appartment or suite is required"
                    @blur="updateCart('billing_address_line2')"
                  />
                </div>
                <div class="c-mt-6 c-flex">
                  <div class="c-w-full">
                    <R64FormInput
                      v-model="form.billing_address_zipcode"
                      label="Zipcode"
                      alert-class="whitespace-no-wrap"
                      :validator="$v.form.billing_address_zipcode"
                      :show-error="$v.form.billing_address_zipcode.$error"
                      error-message="Zipcode is required"
                      @blur="updateCart('billing_address_zipcode')"
                    />
                  </div>
                  <div class="c-w-full c-ml-2">
                    <R64FormInput
                      v-model="form.billing_address_city"
                      label="City"
                      :validator="$v.form.billing_address_city"
                      :show-error="$v.form.billing_address_city.$error"
                      error-message="City is required"
                      @blur="updateCart('billing_address_city')"
                    />
                  </div>
                  <div class="c-w-full c-ml-2">
                    <R64FormSelect
                      v-model="form.billing_address_region"
                      label="State"
                      placeholder="Select state"
                      :options="settings.states"
                      :validator="$v.form.billing_address_region"
                      :show-error="$v.form.billing_address_region.$error"
                      error-message="State is required"
                      @change="updateCart('billing_address_region')"
                    />
                  </div>
                </div>
                <div class="c-mt-6">
                  <R64FormInput
                    v-model="form.billing_address_phone"
                    label="Phone"
                    :validator="$v.form.billing_address_phone"
                    :show-error="$v.form.billing_address_phone.$error"
                    error-message="Phone is required"
                    @blur="updateCart('billing_address_phone')"
                  />
                </div>
              </div>
              <div v-if="!hasCouponCode" class="c-mt-6 lg:c-hidden">
                <span class="c-block c-text-xl">Have a promo code ?</span>
                <R64PromoCode
                  :btn-primary="btnPrimary"
                  :btn-secondary="btnSecondary"
                  @apply="applyPromoCode"
                  class="c-mt-5"
                />
                <R64Alert
                  :visible="promoCodeErrorVisible"
                  class="c-mt-2"
                  message="Promo code is not valid"
                />
              </div>
            </div>
          </div>
        </R64CheckoutSection>
        <div class="c-pt-12 c-pl-5 c-pr-6 c-pb-8 lg:c-hidden c-border-t c-border-c-gray">
          <div class="c-flex c-items-start">
            <input type="checkbox" class="c-form-checkbox">
            <span class="c-ml-3 c--mt-1 c-align-top">I have read and understood, and accept our <a :href="tocUrl" class="c-text-c-blue c-hover:underline">Terms and Conditions, Return Policy, and Privacy Policy</a>.</span>
          </div>
          <R64Button
            :btn-primary="btnPrimary"
            @click.native="createOrder" 
            class="c-mt-6 c-w-full"
          >
            Place Order
          </R64Button>
        </div>
      </div>
      <div class="c-hidden c-w-full lg:c-block lg:c-px-8 lg:c-pt-12 xl:c-px-16">
        <div v-if="cart" class="lg:c-max-w-sm">
          <R64CartItemPreview
            v-for="(cartItem, index) in cartItems"
            :key="index"
            :cart-item="cartItem"
            :currency-symbol="currencySymbol"
            class="c-mt-4"
          />
          <div v-if="!hasCouponCode">
            <R64InlinePromoCode
              :btn-secondary-transparent="btnSecondaryTransparent"
              :class="{ 'c-pb-6': !promoCodeErrorVisible }"
              @apply="applyPromoCode"
              class="c-pt-6"
            />
            <R64Alert
              :visible="promoCodeErrorVisible"
              class="c-mt-2 c-mb-4"
              message="Promo code is not valid"
            />
            <R64HorizontalLine />
          </div>
          <div class="c-my-6">
            <div class="c-flex c-justify-between">
              <span>Subtotal</span>
              <span>{{ money(cart.items_subtotal) }}</span>
            </div>
            <div v-if="hasCouponCode" class="c-flex c-justify-between c-mt-4">
              <span>Discount</span>
              <span>- {{ money(cart.discount) }}</span>
            </div>
            <div v-if="hasTax" class="c-flex c-justify-between c-mt-4">
              <span>Taxes</span>
              <span>{{ money(cart.tax) }}</span>
            </div>
            <div class="c-flex c-justify-between c-mt-4">
              <span>Shipping</span>
              <span v-if="busyShipping">
                <R64Spinner />
              </span>
              <span v-else-if="hasShipping">
                {{ money(cart.shipping) }}
              </span>
              <span v-else>TBD</span>
            </div>
          </div>
          <R64HorizontalLine />
          <div class="c-flex c-items-center c-justify-between c-my-6">
            <span class="c-text-xl c-font-bold">Total to Pay</span>
            <span class="c-text-4xl">
              <span v-if="busyShipping || busyZipCode">
                <R64Spinner />
              </span>
              <span v-else>{{ money(cart.total) }}</span>
            </span>
          </div>
          <div class="c-flex c-items-start">
            <input v-model="consent" type="checkbox" class="c-form-checkbox">
            <span class="c-ml-3 c--mt-1 c-align-top">I have read and understood, and accept our <a :href="tocUrl" class="c-text-c-blue c-hover:underline">Terms and Conditions, Return Policy, and Privacy Policy</a>.</span>
          </div>
          <R64Button
            :disabled="!consent"
            :btn-primary="btnPrimary"
            @click.native="createOrder" 
            class="c-mt-6" 
          >
            Place Order
          </R64Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import R64CartItemPreview from './R64CartItemPreview'
import R64FormInput from './R64FormInput'
import R64FormSelect from './R64FormSelect'
import R64CheckoutSection from './R64CheckoutSection'
import R64Alert from './R64Alert'
import R64PromoCode from "./R64PromoCode"
import R64Button from "./R64Button"
import R64InlinePromoCode from './R64InlinePromoCode'
import R64HorizontalLine from './R64HorizontalLine'
import R64StripePayment from './R64StripePayment'
import R64Spinner from './R64Spinner'
import cartMixin from '../mixins/cart'
import money from '../mixins/money'
import theme from '../mixins/theme'
import cart from '../api/cart'
import order from '../api/order'
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
import debounce from 'lodash/debounce'

export default {
  mixins: [cartMixin, money, validationMixin, theme],

  props: {
    stripeKey: {
      type: String,
      default: null
    },
    authToken: {
      type: String,
      default: null
    },
    settings: {
      type: Object,
      default: null
    },
    shippingRequest: {
      type: Boolean,
      default: false
    },
    zipcodeRequest: {
      type: Boolean,
      default: false
    },
  },

  components: {
    R64Button,
    R64CartItemPreview,
    R64FormInput,
    R64FormSelect,
    R64CheckoutSection,
    R64InlinePromoCode,
    R64PromoCode,
    R64HorizontalLine,
    R64StripePayment,
    R64Alert,
    R64Spinner,
  },

  data () {
    return {
      itemSummaryVisible: false,
      form: {
        customer_email: null,
        customer_notes: null,
        shipping_first_name: null,
        shipping_last_name: null,
        shipping_address_line1: null,
        shipping_address_line2: null,
        shipping_address_city: null,
        shipping_address_region: null,
        shipping_address_zipcode: null,
        shipping_address_phone: null,
        billing_same: false,
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
      consent: false,
      busyZipCode: false,
      busyShipping: false,
    }
  },

  validations () {
    const requiredFields = {
      customer_email: { email },
      shipping_first_name: {},
      shipping_last_name: {},
      shipping_address_line1: {},
      shipping_address_line2: {},
      shipping_address_city: {},
      shipping_address_region: {},
      shipping_address_zipcode: {},
      shipping_address_phone: {},
      billing_same: { required },
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

    await this.fetchCart()
  },

  computed: {
    itemSummaryText () {
      return this.itemSummaryVisible ? 'Hide item summary' : 'Show item summary'
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
      return parseFloat(this.cart.discount) !== 0
    },

    hasTax () {
      return parseFloat(this.cart.tax) !== 0
    },

    isFree () {
      return parseFloat(this.cart.total) === 0
    },

    hasShipping () {
      return parseFloat(this.cart.shipping) !== 0
    },
  },

  methods: {
    async applyPromoCode (couponCode) {
      try {
        await cart.update(this.cartToken, {
          coupon_code: couponCode
        })
        this.fetchCart()
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
        this.form.billing_same = true
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

      let orderParams = {
        order: {
          cart_token: this.cartToken,
          ...this.form
        },
        auth_token: this.authToken
      }

      try {
        if (!this.isFree) {
          const { token } = await this.$refs.stripe.createToken()

          orderParams = {
            ...orderParams,
            stripe: {
              token: token.id
            }
          }
        }

        const { data } = await order.create(orderParams)

        this.$emit('order:create', data)
      } catch (e) {
        //
      }
    },

    updateCart: debounce(async function (property) {
      if (this.$v.form[property].$invalid || !this.propertyDiff(property)) {
        return
      }

      try {
        const { data } = await cart.update(this.cartToken, {
          ...this.form
        })

        this.cart = data
        this.$emit('cart:update', data)
      } catch (e) {
        //
      }
    }, 100),

    async updateCartZipCode (zipCode) {
      this.busyZipCode = true
      try {
        const { data } = await cart.updateZipCode(this.cartToken, zipCode)
        this.cart = data
        this.$emit('cart:update', data)
      } catch (e) {
        //
      }
      this.busyZipCode = false

      await this.updateCartShipping(zipCode)
    },

    async updateCartShipping (zipCode) {
      this.busyShipping = true
      try {
        const { data } = await cart.updateShipping(this.cartToken, zipCode)
        this.cart = data
      } catch (e) {
        //
      }
      this.busyShipping = false
      this.$emit('cart:update', this.cart)
    },

    propertyDiff (property) {
      const cartProperty = this.cart[property]
      const formProperty = this.form[property]

      if (cartProperty === null && formProperty === "") {
        return false
      }

      return cartProperty !== formProperty
    },
  },

  watch: {
    cart (newCart) {
      this.form.customer_email = this.cart.customer_email
      this.form.customer_notes = this.cart.customer_notes
      this.form.shipping_first_name = this.cart.shipping_first_name
      this.form.shipping_last_name = this.cart.shipping_last_name
      this.form.shipping_address_line1 = this.cart.shipping_address_line1
      this.form.shipping_address_line2 = this.cart.shipping_address_line2
      this.form.shipping_address_city = this.cart.shipping_address_city
      this.form.shipping_address_region = this.cart.shipping_address_region
      this.form.shipping_address_zipcode = this.cart.shipping_address_zipcode
      this.form.shipping_address_phone = this.cart.shipping_address_phone
      this.form.billing_same = this.cart.billing_same
      this.form.billing_first_name = this.cart.billing_first_name
      this.form.billing_last_name = this.cart.billing_last_name
      this.form.billing_address_line1 = this.cart.billing_address_line1
      this.form.billing_address_line2 = this.cart.billing_address_line2
      this.form.billing_address_zipcode = this.cart.billing_address_zipcode
      this.form.billing_address_city = this.cart.billing_address_city
      this.form.billing_address_region = this.cart.billing_address_region
      this.form.billing_address_phone = this.cart.billing_address_phone
    },
  }
}
</script>
