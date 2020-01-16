<template>
  <div>
    <div v-for="(method, index) in methods" :key="index" class="flex w-full mt-5">
      <input @change="() => $emit('change', method)" name="shipping" type="radio" class="form-radio" :id="`shipping_option_${index}`" :value="method">
      <label class="ml-3" :for="`shipping_option_${index}`">
        <span class="block">{{ method.delivery_days }} business days</span>
        <span class="block text-sm">Get it {{ method.delivery_date }}</span>
      </label>
      <label class="ml-auto" :class="{ 'text-c-blue' : method.price == 0 }" :for="`shipping_option_${index}`">{{ formatPrice(method.price) }}</label>
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