<template>
    <div class="c-pt-5 c-pl-5 c-pr-5 c-pb-8 lg:c-pt-16 lg:c-pb-8 lg:c-pl-24" :class="classes">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        border: {
            type: Boolean,
            default: true
        }
    },

    computed: {
        classes () {
            return this.border ? 'c-border-b c-border-c-gray' : ''
        }
    }
}
</script>
