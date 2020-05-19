# Gettings started

Checkout Vue is a complementary package for [Checkout Api](https://github.com/64robots/checkout). It provides UI components for Cart, Checkout, Order and Single Item Checkout.

### Available components:

- [x] R64Cart
- [x] R64Checkout
- [x] R64SingleItemCheckout
- [x] R64Order

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