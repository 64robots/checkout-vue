<template>
    <div class="font-sans antialiased text-c-black" style="box-sizing: border-box;">
        <div class="fixed top-0 left-0 right-0 p-5 z-10 bg-white" style="box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.13);">
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

        <form class="mt-24 p-6">
            <h2 class="text-3xl">Check Out</h2>
            <div class="mt-6 pb-8">
                <span class="block text-xl font-bold">Contact</span>
                <div class="mt-6">
                    <label class="block" for="customer_email">Email Address</label>
                    <R64Input id="customer_email" class="w-full mt-2"/>
                </div>
            </div>
            <R64HorizontalLine class="-mx-6"/>

            <div class="mt-6 pb-8">
                <span class="block text-xl font-bold">Shipping</span>
                <span class="mt-6 block text-xl">Shipping Address</span>
                <div class="mt-6">
                    <label class="block" for="shipping_address_line1">Street</label>
                    <R64Input id="shipping_address_line1" class="w-full mt-2"/>
                </div>
                <div class="mt-6">
                    <label class="block" for="shipping_address_line2">Apartment, suite, etc... (Optional)</label>
                    <R64Input id="shipping_address_line2" class="w-full mt-2"/>
                </div>
                <div class="mt-6 flex">
                    <div>
                        <label class="block" for="shipping_adddress_zipcode">Zipcode</label>
                        <R64Input id="shipping_adddress_zipcode" class="w-full mt-2"/>
                    </div>
                    <div class="ml-2">
                        <label class="block" for="shipping_address_city">City</label>
                        <R64Input id="shipping_address_city" class="w-full mt-2"/>
                    </div>
                    <div class="ml-2">
                        <label class="block" for="shipping_address_region">State</label>
                        <R64Input id="shipping_address_region" class="w-full mt-2"/>
                    </div>
                </div>
                <div class="mt-6">
                    <label class="block" for="shipping_address_phone">Phone (Optional)</label>
                    <R64Input id="shipping_address_phone" class="w-full mt-2"/>
                </div>
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
            <R64HorizontalLine class="-mx-6"/>
            <div class="mt-6 pb-8">
                <span class="block text-xl font-bold">Payment</span>
                <span class="block mt-4 text-xl">Payment method</span>
                <div class="mt-6">
                    <label class="block" for="card_holder_name">Name on Card</label>
                    <R64Input id="card_holder_name" class="w-full mt-2"/>
                </div>
                <div class="mt-6">
                    <label class="block" for="card_number">Card Number</label>
                    <R64CardNumberInput class="mt-2"/>
                </div>
                <div class="mt-6 flex">
                    <div>
                        <label class="block" for="card_expiration_date">Expiration Date</label>
                        <R64Input id="card_expiration_date" class="w-full mt-2" placeholder="MM/YY"/>
                    </div>
                    <div class="ml-4">
                        <label class="block" for="card_cvv">Security Code</label>
                        <R64Input id="card_cvv" class="w-full mt-2" placeholder="CVV"/>
                    </div>
                </div>
            </div>
            <R64HorizontalLine class="-mx-6"/>
        </form>
    </div>
</template>

<script>
import R64CartItemPreview from './R64CartItemPreview'
import R64Input from './R64Input'
import R64CardNumberInput from "./R64CardNumberInput";
import R64HorizontalLine from './R64HorizontalLine'

export default {
    components: {
        R64CartItemPreview,
        R64Input,
        R64CardNumberInput,
        R64HorizontalLine
    },

    computed: {
        itemSummaryText () {
            return this.itemSummaryVisible ? 'Hide item summary' : 'Show item summary'
        }
    },

    data () {
        return {
            itemSummaryVisible: false
        }
    }
}
</script>

<style src="../assets/tailwind.css">
