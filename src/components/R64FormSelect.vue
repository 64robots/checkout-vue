<template>
  <label class="c-relative">
    <div
      v-if="label"
      class="c-mb-2"
    >
      {{ label }}
    </div>
    <div class="c-relative">
      <select
        ref="input"
        :autocomplete="autocomplete"
        v-model="localValue"
        :disabled="disabled"
        :class="[ inputClass, {
          'c-border-red-500 c-focus:border-red-600': error,
          'c-border-c-gray c-focus:border-c-grayer': !error,
          'c-bg-c-light-gray': disabled,
        } ]"
        class="c-bg-white"
        @change="onChange"
      >
        <option :value="null">{{ placeholder }}</option>
        <option :value="option.value" v-for="(option, index) in options" :key="index">{{ option.value }}</option>
      </select>
      <R64Alert
        :class="alertClass"
        class="c-absolute c-left-0"
        :visible="errorVisible"
        :message="errorMessage"
      />
    </div>
  </label>
</template>

<script>
import R64FormInput from './R64FormInput'

export default {
  name: 'R64FormSelect',
  extends: R64FormInput,
  props: {
    options: {
      type: Array,
      default: () => []
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    onChange() {
      if (this.validator) {
        this.validator.$touch()
      }

      this.$nextTick(() => (this.$emit('change')))
    },
  }
}
</script>