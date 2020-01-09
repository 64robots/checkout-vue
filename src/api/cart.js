import http from './http'

export default {
    url: '/api/carts',

    create (productId) {
        return http.post(this.url, {
            product_id: productId
        })
    },

    get (cartToken) {
        return http.get(this.url + `/${cartToken}`)
    },

    update (cartToken, discountCode) {
        return http.put(this.url + `/${cartToken}`, {
            discount_code: discountCode
        })
    },

    delete (cartToken) {
        return http.delete(this.url + `/${cartToken}`)
    }
}
