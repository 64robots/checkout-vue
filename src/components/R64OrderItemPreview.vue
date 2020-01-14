<template>
  <div class="flex pb-4 border-b border-c-gray">
    <div v-if="hasImage" class="w-16 h-16 bg-c-mid-gray flex-shrink-0">
    </div>
    <div :class="classes" class="w-full flex flex-col items-end">
      <div class="w-full flex justify-between">
        <span class="font-bold">{{ name }}</span>
        <span class="text-sm">Qty {{ quantity }}</span>
      </div>
      <span class="mt-auto font-bold text-xl">{{ money(price) }}</span>
    </div>
  </div>
</template>

<script>
import cartItem from '../mixins/cartItem'
import money from '../mixins/money'

export default {
  mixins: [money],

  props: {
    name: {
      type: String,
      default: null
    },
    quantity: {
      type: Number,
      default: 0
    },
    price: {
      type: String,
      default: null
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
