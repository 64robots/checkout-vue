import http from './http'
import cart from './cart'

export default {
    url: 'api/cart-items',

    create (cartToken, cartItem) {
        return http.post(cart.url + `/${cartToken}/cart-items`, {
            product_id: cartItem.product_id,
            quantity: cartItem.quantity
        })
    },

    update (cartItemToken, data) {
        return http.put(this.url + `/${cartItemToken}`, data)
    },

    delete (cartItemToken) {
        return http.delete(this.url + `/${cartItemToken}`)
    }
}
