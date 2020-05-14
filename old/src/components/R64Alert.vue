<template>
  <div
    v-show="visible"
    class="c-flex c-w-full c-text-sm c-text-white c-mt-1"
  >
    <span :class="classes">
      {{ message }}
    </span>

    <span
      v-if="closable"
      class="c-px-4 c-text-lg c-cursor-pointer"
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
        'c-text-red-600': this.isError,
        'c-text-green-500': this.isSuccess,
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
