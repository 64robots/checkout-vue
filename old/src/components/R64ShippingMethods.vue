<template>
  <div>
    <div v-for="(method, index) in methods" :key="index" class="c-flex c-w-full c-mt-5">
      <input @change="() => $emit('change', method)" name="shipping_method" type="radio" class="c-form-radio" :id="`shipping_option_${index}`" :value="method">
      <label class="c-ml-3" :for="`shipping_option_${index}`">
        <span class="c-block">{{ method.delivery_days }} business days</span>
        <span class="c-block c-text-sm">Get it {{ method.delivery_date }}</span>
      </label>
      <label class="c-ml-auto" :class="{ 'c-text-c-blue' : method.price == 0 }" :for="`shipping_option_${index}`">{{ formatPrice(method.price) }}</label>
    </div>
  </div>
</template>

<script>
import money from '../mixins/money'

export default {
  mixins: [money],

  props: {
    methods: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    formatPrice (price) {
      return price == 0 ? 'FREE' : this.money(price)
    }
  }
}
</script>
