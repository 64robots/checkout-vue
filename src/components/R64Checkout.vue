<template>
    <div class="font-sans antialiased text-c-black bg-c-grayest" style="box-sizing: border-box;">
        <div class="checkout-cart-items fixed p-5 top-0 left-0 right-0 z-10 bg-white lg:hidden">
            <div class="flex items-center justify-between">
                <span class="text-xl">Total to pay (2 items)</span>
                <span class="text-xl font-bold">$352.50</span>
            </div>

            <div v-show="itemSummaryVisible" class="mt-10">
                <R64CartItemPreview class="mt-4" v-for="index in 4" :border="index !== 4" :key="index"/>
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

        <div class="lg:flex lg:mx-auto lg:max-w-7xl">
            <form class="checkout-form w-full mt-24 bg-white lg:flex-shrink-0 lg:max-w-2xl lg:mt-0 xl:max-w-4xl">
                <R64CheckoutSection>
                    <button type="button" @click="$emit('cart')" class="text-c-blue flex items-center">
                        <span><svg class="w-3 h-3" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.41 10.59L2.83 6l4.58-4.59L6 0 0 6l6 6 1.41-1.41z" fill="#006ED4"/></svg></span>
                        <span class="ml-3">Back to cart</span>
                    </button>
                    <h2 class="mt-3 text-3xl">Check Out</h2>
                    <div class="xl:flex mt-6">
                        <span class="block text-xl font-bold xl:w-1/3">Contact</span>
                        <div class="w-full mt-6 lg:max-w-sm xl:mt-0">
                            <label class="block" for="customer_email">Email Address</label>
                            <R64Input id="customer_email" class="w-full mt-2"/>
                        </div>
                    </div>
                </R64CheckoutSection>
                <R64CheckoutSection>
                    <div class="xl:flex mt-6">
                        <span class="block text-xl font-bold xl:w-1/3">Shipping</span>
                        <div class="w-full lg:max-w-sm">
                            <span class="mt-6 block text-xl xl:mt-0">Shipping Address</span>
                            <R64Address v-model="shippingAddress" prefix="shipping" />
                            <div class="mt-6">
                                <span class="block text-xl">Shipping method</span>
                                <div class="mt-5 w-full flex">
                                    <input name="shipping" type="radio" class="form-radio" id="shipping_option_1">
                                    <label class="ml-3" for="shipping_option_1">
                                        <span class="block">5 business days</span>
                                        <span class="block text-sm">Get it Saturday Dec 21</span>
                                    </label>
                                    <label class="ml-auto text-c-blue" for="shipping_option_1">FREE</label>
                                </div>

                                <div class="mt-5 w-full flex">
                                    <input name="shipping" type="radio" class="form-radio" id="shipping_option_2">
                                    <label class="ml-3" for="shipping_option_2">
                                        <span class="block">2 business days</span>
                                        <span class="block text-sm">Get it Saturday Dec 18</span>
                                    </label>
                                    <label class="ml-auto" for="shipping_option_2">$6.50</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </R64CheckoutSection>
                <R64CheckoutSection :border="false">
                    <div class="xl:flex mt-6">
                        <span class="block text-xl font-bold xl:w-1/3">Payment</span>
                        <div class="w-full lg:max-w-sm">
                            <span class="mt-6 block text-xl xl:mt-0">Payment method</span>
                            <div class="mt-6">
                                <label class="block" for="card_holder_name">Name on Card</label>
                                <R64Input id="card_holder_name" class="w-full mt-2"/>
                            </div>
                            <div class="mt-6">
                                <label class="block" for="card_number">Card Number</label>
                                <R64CardNumberInput class="mt-2"/>
                            </div>
                            <div class="mt-6 flex">
                                <div class="w-full">
                                    <label class="block" for="card_expiration_date">Expiration Date</label>
                                    <R64Input id="card_expiration_date" class="w-full mt-2" placeholder="MM/YY"/>
                                </div>
                                <div class="w-full ml-4">
                                    <label class="block" for="card_cvv">Security Code</label>
                                    <R64Input id="card_cvv" class="w-full mt-2" placeholder="CVV"/>
                                </div>
                            </div>
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
                            <R64Address v-model="billingAddress" v-if="billingAddressDifferent" />

                            <div class="mt-6 lg:hidden">
                                <span class="block text-xl">Have a promo code ?</span>
                                <R64PromoCode class="mt-5" />
                            </div>
                        </div>
                    </div>
                </R64CheckoutSection>
                <div class="pt-12 pl-5 pr-6 pb-8 lg:hidden border-t border-c-gray">
                    <div class="flex items-start">
                        <input type="checkbox" class="form-checkbox">
                        <span class="ml-3 -mt-1 align-top">I have read and understood, and accept our <a href="" class="text-c-blue hover:underline">Terms and Conditions, Return Policy, and Privacy Policy</a>.</span>
                    </div>
                    <R64Button type="submit" class="mt-6 w-full">Place Order</R64Button>
                </div>
            </form>
            <div class="hidden w-full lg:block lg:px-8 lg:pt-12 xl:px-16">
                <div class="lg:max-w-sm">
                    <R64CartItemPreview class="mt-4" v-for="i in 3" :key="i"/>
                    <R64InlinePromoCode class="py-6"/>
                    <R64HorizontalLine />
                    <div class="my-6">
                        <div class="flex justify-between">
                            <span>Subtotal</span>
                            <span>-$342.50</span>
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
                            <span>$32.34</span>
                        </div>
                        <div class="flex justify-between mt-4">
                            <span>Shipping</span>
                            <span>$5.00</span>
                        </div>
                    </div>
                    <R64HorizontalLine />
                    <div class="flex items-center justify-between my-6">
                        <span class="text-xl font-bold">Total to Pay</span>
                        <span class="text-4xl">$352.50</span>
                    </div>
                    <R64Button @click.native="$emit('order')">Place Order</R64Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import R64CartItemPreview from './R64CartItemPreview'
import R64Input from './R64Input'
import R64CardNumberInput from "./R64CardNumberInput"
import R64CheckoutSection from './R64CheckoutSection'
import R64Address from './R64Address'
import R64PromoCode from "./R64PromoCode"
import R64Button from "./R64Button"
import R64InlinePromoCode from './R64InlinePromoCode'
import R64HorizontalLine from './R64HorizontalLine'

export default {
    components: {
        R64Button,
        R64CartItemPreview,
        R64Input,
        R64CardNumberInput,
        R64CheckoutSection,
        R64InlinePromoCode,
        R64Address,
        R64PromoCode,
        R64HorizontalLine
    },

    computed: {
        itemSummaryText () {
            return this.itemSummaryVisible ? 'Hide item summary' : 'Show item summary'
        }
    },

    data () {
        return {
            itemSummaryVisible: false,
            billingAddressDifferent: false,
            shippingAddress: {},
            billingAddress: {}
        }
    }
}
</script>

<style src="../assets/app.css">
