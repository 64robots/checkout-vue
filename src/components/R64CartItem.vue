<template>
    <div class="flex mt-10 pb-10 border-b border-c-gray">
        <div class="w-40 h-40 bg-c-light-gray flex-shrink-0">
        </div>
        <div class="ml-6 w-full flex flex-col">
            <div class="flex justify-between">
                <span class="text-xl">Soft Edge 12 side chair</span>
                <span class="text-xl font-bold">$320.00</span>
            </div>

            <R64Input class="mt-4 max-w-lg" placeholder="Custom note (Optional)" />

            <div class="mt-auto flex items-center">
                <span>Qty</span>
                <input type="text" class="w-10 h-8 ml-5 rounded border border-c-gray focus:outline-none focus:border-c-grayer text-center">
                <span class="w-px h-6 ml-5 border-l border-c-gray"></span>
                <button class="ml-5">
                    <svg class="w-5 h-5" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 15.9999C1 17.0999 1.9 17.9999 3 17.9999H11C12.1 17.9999 13 17.0999 13 15.9999V3.99994H1V15.9999ZM14 0.999939H10.5L9.5 -6.10352e-05H4.5L3.5 0.999939H0V2.99994H14V0.999939Z" fill="#737373"/>
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import R64Input from './R64Input'

export default {
    components: {
        R64Input
    }
}
</script>

<style src="../assets/tailwind.css" scoped>
