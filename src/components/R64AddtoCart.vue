<template>
    <R64AddToCart :cart-token="cartToken" v-slot="{ addToCart }">
        <R64Button @click.native="addToCart(productId)" @cart:update="(cart) => $emit('cart:update', cart)">Add to cart</R64Button>
    </R64AddToCart>
</template>

<script>
import R64AddToCart from "./renderless/R64AddToCart";
import R64Button from "./R64Button";

export default {
    props: ['cartToken', 'productId', 'quantity'],

    components: {
        R64Button,
        R64AddToCart
    }
}
</script>
