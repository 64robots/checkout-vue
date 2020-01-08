<template>
    <button :class="classes" class="w-full py-3 rounded"><slot></slot></button>
</template>

<script>
export default {
    props: {
        variant: {
            type: String,
            default: 'blue'
        }
    },
    computed: {
        classes () {
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
