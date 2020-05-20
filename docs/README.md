# Gettings started

Checkout Vue is a complementary package for [Checkout Api](https://github.com/64robots/checkout). It provides UI components for Cart, Checkout, Order and Single Item Checkout.

### Available components:

- [R64Cart](/components.html#r64cart)
- [R64Checkout](/components.html#r64checkout)
- [R64Order](/components.html#r64order)
- [R64SingleItemCheckout](/components.html#r64singleitemcheckout)

## Installation

You can install this package using yarn:
```bash
yarn add @64robots/checkout-vue
```
or if you use npm
```bash
npm install --save @64robots/checkout-vue
```

## Usage

You can use the package as a plugin
```javascript
// main.js
import R64Checkout from '@64robots/checkout-vue'

Vue.use(R64Checkout)
```
or import components independently

```javascript
// your-components.js
import { R64Cart } from '@64robots/checkout-vue'
```