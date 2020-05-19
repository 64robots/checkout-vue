<template>
    <input :value="value" @input="(e) => $emit('input', e.target.value)" @change="(e) => $emit('change', e.target.value)" type="text" class="c-h-10 c-px-3 c-rounded c-border c-text-base c-focus:outline-none" :class="classes">
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: null
    },
    error: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    classes () {
      return this.error ? 'c-border-red-400 c-focus:border-red-600' : 'c-border-c-gray-400 c-focus:border-c-grayer'
    }
  }
}
</script>

<style scoped>
input::placeholder {
    color: #737373;
}
</style>
