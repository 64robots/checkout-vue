<template>
    <button :class="classes" class="c-w-full c-py-3 c-rounded" :disabled="disabled"><slot></slot></button>
</template>

<script>
import theme from '../mixins/theme'

export default {
    mixins: [theme],

    props: {
        variant: {
            type: String,
            default: 'primary'
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        classes () {
            if (this.disabled) {
                return 'c-bg-c-gray-300 c-text-c-gray-500'
            }

            if (this.variant === 'primary') {
                return `${this.btnPrimary}`
            } else if (this.variant === 'secondary') {
                return this.btnSecondary
            } else if (this.variant === 'secondary-transparent') {
                return this.btnSecondaryTransparent
            }

            return `${this.btnPrimary}`
        }
    }
}
</script>
