<template>
    <input :value="value" @input="(e) => $emit('input', e.target.value)" @change="(e) => $emit('change', e.target.value)" type="text" class="h-10 px-3 rounded border text-base focus:outline-none" :class="classes">
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
        return this.error ? 'border-red-400 focus:border-red-600' : 'border-c-gray focus:border-c-grayer'
      }
    }
}
</script>

<style scoped>
input::placeholder {
    color: #737373;
}
</style>
