<template>
  <div id="app">
    <R64Button v-if="section === null" @click.native="section = 'cart'">Cart</R64Button>
    <R64Cart v-if="section === 'cart'" @close="section = null" @checkout="section = 'checkout'"/>
    <R64Checkout v-if="section === 'checkout'" @cart="section = 'cart'" @order="section = 'order'"/>
    <R64Order v-if="section === 'order'" />
  </div>
</template>

<script>
import R64Cart from './components/R64Cart'
import R64Checkout from './components/R64Checkout'
import R64Order from './components/R64Order'
import R64Button from "./components/R64Button";

export default {
  name: 'app',

  data () {
      return {
        section: null
      }
  },

  components: {
    R64Button,
    R64Cart,
    R64Checkout,
    R64Order
  }
}
</script>
