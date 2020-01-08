<template>
    <div class="pt-5 pl-5 pr-5 pb-8 lg:pt-16 lg:pb-8 lg:pl-24" :class="classes">
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
            return this.border ? 'border-b border-c-gray' : ''
        }
    }
}
</script>
