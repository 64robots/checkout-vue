<template>
  <div class="c-flex c-pb-4" :class="{ 'border-b border-c-gray': border }">
    <div v-if="hasImage" class="c-flex c-items-center c-justify-center c-w-16 c-h-16 c-bg-c-gray-200 c-flex-shrink-0">
      <img :src="imageSrc" alt="Product image">
    </div>
    <div :class="classes" class="c-w-full c-flex c-flex-col c-items-end">
      <div class="c-w-full c-flex c-justify-between">
        <span class="c-font-bold">{{ cartItem.product.name }}</span>
        <span class="c-text-sm">Qty {{ cartItem.quantity }}</span>
      </div>
      <div class="c-w-full c-flex c-justify-between">
        <span class="c-text-sm">{{ cartItem.customer_note }}</span>
        <span class="c-font-bold c-text-xl">{{ money(cartItem.price) }}</span>
      </div>
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
      return this.hasImage ? 'c-ml-4' : ''
    }
  },
}
</script>
