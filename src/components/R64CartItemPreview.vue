<template>
  <div class="flex pb-4" :class="{ 'border-b border-c-gray': border }">
    <div v-if="hasImage" class="w-16 h-16 bg-c-mid-gray flex-shrink-0">
    </div>
    <div :class="classes" class="w-full flex flex-col items-end">
      <div class="w-full flex justify-between">
        <span class="font-bold">{{ cartItem.product.name }}</span>
        <span class="text-sm">Qty {{ cartItem.quantity }}</span>
      </div>
      <span class="mt-auto font-bold text-xl">{{ money(cartItem.price) }}</span>
    </div>
  </div>
</template>

<script>
import cartItem from '../mixins/cartItem'
import money from '../mixins/money'

export default {
  mixins: [cartItem, money],

  props: {
    border: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    classes () {
      return this.hasImage ? 'ml-4' : ''
    }
  },
}
</script>

<style src="../assets/app.css" scoped>
