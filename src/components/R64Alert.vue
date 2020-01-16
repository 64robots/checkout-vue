<template>
  <div
    v-show="visible"
    class="flex w-full text-sm text-white mt-1"
  >
    <span :class="classes" class="whitespace-no-wrap">
      {{ message }}
    </span>

    <span
      v-if="closable"
      class="px-4 text-lg cursor-pointer"
      @click="$emit('close')"
    >x</span>
  </div>
</template>

<script>
export default {
  name: 'R64Alert',

  props: {
    message: {
      type: String,
      default: null,
    },

    type: {
      type: String,
      default: 'error',
    },

    visible: {
      type: Boolean,
      default: true,
    },

    closable: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    classes() {
      return {
        'text-red-600': this.isError,
        'text-green-500': this.isSuccess,
      }
    },

    isError() {
      return this.type === 'error'
    },

    isSuccess() {
      return this.type === 'success'
    },
  },
}
</script>
