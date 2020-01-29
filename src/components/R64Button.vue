<template>
    <button :class="classes" class="c-w-full c-py-3 c-rounded" :disabled="disabled"><slot></slot></button>
</template>

<script>
export default {
    props: {
        variant: {
            type: String,
            default: 'blue'
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        classes () {
            if (this.disabled) {
                return 'c-bg-c-mid-grayer c-text-c-grayer'
            }

            if (this.variant === 'blue') {
                return 'c-bg-c-blue c-text-white c-font-bold'
            } else if (this.variant === 'white') {
                return 'c-bg-white c-text-c-blue c-border c-border-c-blue'
            } else if (this.variant === 'transparent') {
                return 'c-bg-transparent c-text-c-blue c-border c-border-c-blue'
            }

            return 'c-bg-c-blue c-text-white c-font-bold'
        }
    }
}
</script>
