<template>
    <input :value="value" @input="(e) => $emit('input', e.target.value)" type="text" class="h-10 px-3 rounded border border-c-gray text-base focus:outline-none focus:border-c-grayer">
</template>

<script>
export default {
    props: ['value']
}
</script>

<style scoped>
input::placeholder {
    color: #737373;
}
</style>
