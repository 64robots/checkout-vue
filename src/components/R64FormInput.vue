<template>
  <label class="relative">
    <div
      v-if="label"
      class="mb-2"
    >
      {{ label }}
    </div>
    <div class="relative">
      <input
        :id="id"
        ref="input"
        v-model="localValue"
        :class="[ inputClass, {
          'border-red-500 focus:border-red-600': error,
          'border-c-gray focus:border-c-grayer': !error
        } ]"
        :type="internalType"
        :placeholder="placeholder"
        @blur="onBlur"
        @input="onInput"
      >
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
import R64Alert from './R64Alert'

export default {
  name: 'R64FormInput',

  components: {
    R64Alert
  },  

  props: {
    id: {
      type: String,
      default: null,
    },

    inputClass: {
      type: String,
      default:
        'h-10 w-full px-3 rounded border text-base focus:outline-none',
    },

    alertClass: {
      type: String,
      default: null
    },

    errorMessage: {
      type: String,
      default: '',
    },

    showError: {
      type: Boolean,
      default: false
    },

    label: {
      type: String,
      default: null,
    },

    placeholder: {
      type: String,
      default: '',
    },

    type: {
      type: String,
      default: 'text',
    },

    validator: {
      type: Object,
      default: null,
    },

    value: {
      type: [String, Number, Object],
      default: '',
    },
  },

  data() {
    return {
      hasInput: false,
      localValue: this.value,
    }
  },

  computed: {
    internalType() {
      if (this.type === 'date' || this.type === 'phone' || this.type === 'email') {
        return 'text'
      }
      return this.type
    },

    error() {
      return this.validator && this.validator.$error && (this.hasInput || this.showError)
    },

    errorId() {
      if (!this.invalidMessage) {
        return null
      }
      if (!this.id) {
        return 'error-feedback'
      }
      return `${this.id}-error-feedback`
    },

    errorVisible() {
      return this.error && this.errorMessage !== null
    },

    keyboardType() {
      switch (this.type) {
        case 'date':
        case 'phone':
          return 'numeric'
        case 'email':
          return 'email'
        default:
          return 'normal'
      }
    },

    valid() {
      return this.state === 'valid'
    },
  },

  watch: {
    value(newVal) {
      this.localValue = newVal
    },

    localValue(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit('input', newVal)
      }
    },
  },

  methods: {
    onBlur() {
      if (this.validator && this.hasInput) {
        this.validator.$touch()
      }
      this.$emit('blur', this.localValue)
    },

    onInput() {
      this.hasInput = true
    },
  },
}
</script>