<template>
  <div>
    <R64Button type="button" @click.native="hasPromoCode = true" class="c-w-full c-px-0" variant="white" v-if="!hasPromoCode">Add promo code</R64Button>
    <div v-show="hasPromoCode">
      <label class="block" for="promo_code">Promo code</label>
      <R64Input ref="promo_code" v-model="promoCode" id="promo_code" class="c-w-full c-mt-2"/>
      <R64Button @click.native="applyPromoCode" class="c-mt-4">Apply</R64Button>
    </div>
  </div>
</template>

<script>
import R64Input from "./R64Input";
import R64Button from './R64Button'
import promoCode from '../mixins/promoCode'

export default {
  mixins: [promoCode],

  components: {
    R64Button,
    R64Input
  }
}
</script>
