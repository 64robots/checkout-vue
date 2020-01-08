<template>
    <div class="font-sans antialiased z-50 text-c-black" style="box-sizing: border-box;">
        <div class="fixed inset-0 bg-c-black opacity-40">
        </div>
        <div class="absolute top-0 left-0 right-0 flex min-h-screen md:justify-end">
            <div class="bg-white w-full max-w-4xl p-12">
                <div class="flex justify-between items-center">
                    <span class="text-4xl">Your Cart (2)</span>
                    <R64CloseButton @click.native="$emit('cart:close')"/>
                </div>
                <R64CartItem v-for="index in 3" :key="index" />
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
                    <div class="mt-6 flex items-center">
                        <span class="text-xl">Subtotal</span>
                        <span class="ml-10 text-4xl">$342.50</span>
                    </div>
                    <div class="mt-6">
                        <R64Button @click.native="$emit('cart:checkout')">Checkout</R64Button>
                    </div>
                    <span class="mt-4 text-sm">Have a promo code? Apply it at check out.</span>
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

export default {
    components: {
        R64CartItem,
        R64CloseButton,
        R64TextArea,
        R64Button
    },

    data () {
        return {
            orderNoteVisible: false
        }
    }
}
</script>

<style src="../assets/app.css" scoped>
