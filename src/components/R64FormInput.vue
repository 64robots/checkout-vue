<template>
	<div>
		<label class="block" :for="name"><span v-if="required" class="text-red-700">* </span>{{ label }}</label>
		<R64Input :value="value" @input="(newValue) => $emit('input', newValue)" :id="name" class="w-full mt-2"/>
	</div>
</template>

<script>
import R64Input from './R64Input'

export default {
	props: {
		name: {
			type: String,
			default: null
		},
		label: {
			type: String,
			default: null
		},
		required: {
			type: Boolean,
			default: false
		},
		error: {
			type: Boolean,
			default: false
		},
		value: {
			type: String,
			default: null
		}
	},

	components: {
		R64Input
	}
}
</script>