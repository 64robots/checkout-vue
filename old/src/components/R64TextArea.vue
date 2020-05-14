<template>
    <textarea 
      :value="value"
      class="c-p-3 c-rounded c-border c-border-c-gray c-text-base c-focus:outline-none c-focus:border-c-grayer"
      @blur="(e) => $emit('blur', e.target.value)"
      @input="(e) => $emit('input', e.target.value)"
    >
    </textarea>
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
