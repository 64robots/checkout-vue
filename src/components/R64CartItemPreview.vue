<template>
    <div class="flex pb-4" :class="{ 'border-b border-c-gray': border }">
        <div class="w-16 h-16 bg-c-mid-gray flex-shrink-0">
        </div>
        <div class="ml-4 w-full flex flex-col items-end">
            <div class="w-full flex justify-between">
                <span class="font-bold">Soft Edge 12 side chair</span>
                <span class="text-sm">Qty 1</span>
            </div>
            <span class="mt-auto font-bold text-xl">$320.00</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        border: {
            type: Boolean,
            default: true
        }
    }
}
</script>

<style src="../assets/app.css" scoped>
