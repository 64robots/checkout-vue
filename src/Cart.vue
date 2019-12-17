<template>
  <div>
    <p>Items: {{ cart.cart_items.length }}</p>
    <p>Items subtotal: {{ cart.items_subtotal }}</p>
    <p>Tax rate: {{ cart.tax_rate }}</p>
    <p>Total: {{ cart.total }}</p>
    <ul>
      <li v-for="(cartItem, i) in cart.cart_items" :key="i">
        <CartItem
          :cart-item="cartItem"
          @update="$emit('update')"
          @delete="$emit('delete')"
        />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  props: {
    cart: {
      type: Object,
      default: null
    }
  }
}
</script>
