<template>
  <label class="relative">
    <div
      v-if="label"
      class="mb-2"
    >
      {{ label }}
    </div>
    <div class="relative">
      <select 
        ref="input" 
        v-model="localValue"
        class="bg-white"
        :class="[ inputClass, {
          'border-red-500 focus:border-red-600': error,
          'border-c-gray focus:border-c-grayer': !error
        } ]"
        @change="onChange"
      >
        <option :value="null">{{ placeholder }}</option>
        <option :value="option.value" v-for="(option, index) in options" :key="index">{{ option.value }}</option>
      </select>
      <R64Alert
        :class="alertClass"
        class="absolute bottom-2 left-0"
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
    }
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