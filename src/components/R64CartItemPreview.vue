<template>
  <div class="c-flex c-pb-4" :class="{ 'border-b border-c-gray': border }">
    <div v-if="hasImage" class="c-w-16 c-h-16 c-bg-c-mid-gray c-flex-shrink-0">
    </div>
    <div :class="classes" class="c-w-full c-flex c-flex-col c-items-end">
      <div class="c-w-full c-flex c-justify-between">
        <span class="c-font-bold">{{ cartItem.product.name }}</span>
        <span class="c-text-sm">Qty {{ cartItem.quantity }}</span>
      </div>
      <span class="c-mt-auto c-font-bold c-text-xl">{{ money(cartItem.price) }}</span>
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