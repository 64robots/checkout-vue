<template>
    <div class="font-sans antialiased text-c-black">
        <div class="p-5" style="box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.13);">
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
    </div>
</template>

<script>
import R64CartItemPreview from './R64CartItemPreview'

export default {
    components: {
        R64CartItemPreview
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

<style src="../assets/tailwind.css" scoped>
