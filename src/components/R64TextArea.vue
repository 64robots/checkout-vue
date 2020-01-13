<template>
    <textarea :value="value" @input="(e) => $emit('input', e.target.value)" class="p-3 rounded border border-c-gray text-base focus:outline-none focus:border-c-grayer"></textarea>
</template>

<script>
export default {
	props: {
		value: {
      type: String,
      default: null
    },
	}
}
</script>

<style scoped>
    textarea::placeholder {
        color: #737373;
    }
</style>
