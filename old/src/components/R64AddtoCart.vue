<template>
    <R64AddToCart :cart-token="cartToken" v-slot="{ addToCart }" @cart:update="(cart) => $emit('cart:update', cart)">
        <R64Button @click.native="addToCart(productId)"><slot>Add to cart</slot></R64Button>
    </R64AddToCart>
</template>

<script>
import R64AddToCart from "./renderless/R64AddToCart";
import R64Button from "./R64Button";

export default {
    props: {
      cartToken: {
        type: String,
        default: null
      },
      productId: {
        type: Number,
        default: null
      },
      quantity: {
        type: Number,
        quantity: 1
      }
    },

    components: {
        R64Button,
        R64AddToCart
    }
}
</script>
