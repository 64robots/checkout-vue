<template>
    <div v-if="!hasPromoCode" class="flex items-center w-full">
        <span class="flex-shrink-0">Have a promo code ?</span>
        <R64Button @click.native="hasPromoCode = true" class="ml-4" variant="transparent">Add promo code</R64Button>
    </div>
    <div v-else>
        <label class="block" for="promo_code">Promo code</label>
        <R64Input id="promo_code" class="w-full mt-2"/>
        <R64Button variant="transparent" class="mt-4">Apply</R64Button>
    </div>
</template>

<script>
import R64Button from "./R64Button";
import R64Input from "./R64Input";

export default {
    components: {
        R64Button,
        R64Input
    },
    data () {
        return {
            hasPromoCode: false
        }
    }
}
</script>
