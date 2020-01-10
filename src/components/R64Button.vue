<template>
    <button :class="classes" class="w-full py-3 rounded" :disabled="disabled"><slot></slot></button>
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
                return 'bg-c-mid-grayer text-c-grayer'
            }

            if (this.variant === 'blue') {
                return 'bg-c-blue text-white font-bold'
            } else if (this.variant === 'white') {
                return 'bg-white text-c-blue border border-c-blue'
            } else if (this.variant === 'transparent') {
                return 'bg-transparent text-c-blue border border-c-blue'
            }

            return 'bg-c-blue text-white font-bold'
        }
    }
}
</script>
