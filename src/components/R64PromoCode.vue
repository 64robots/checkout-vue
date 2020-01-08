<template>
    <div>
        <R64Button type="button" @click.native="hasPromoCode = true" class="w-full" variant="white" v-if="!hasPromoCode">Add promo code</R64Button>
        <div v-if="hasPromoCode">
            <label class="block" for="promo_code">Promo code</label>
            <R64Input id="promo_code" class="w-full mt-2"/>
        </div>
    </div>
</template>

<script>
import R64Input from "./R64Input";
import R64Button from './R64Button'

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
