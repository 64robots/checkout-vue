<template>
  <div v-if="!hasPromoCode" class="c-flex c-items-center c-w-full">
    <span class="c-flex-shrink-0">Have a promo code ?</span>
    <R64Button @click.native="hasPromoCode = true" class="c-ml-4" variant="transparent">Add promo code</R64Button>
  </div>
  <div v-else>
    <label class="c-block" for="promo_code">Promo code</label>
    <R64Input ref="promo_code" v-model="promoCode" id="promo_code" class="c-w-full c-mt-2"/>
    <R64Button @click.native="applyPromoCode" variant="transparent" class="c-mt-4">Apply</R64Button>
  </div>
</template>

<script>
import R64Button from "./R64Button";
import R64Input from "./R64Input";
import promoCode from '../mixins/promoCode'

export default {
  mixins: [promoCode],

  components: {
    R64Button,
    R64Input
  }
}
</script>
