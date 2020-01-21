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

  getTotal (cartToken, shippingId) {
    let url = `${this.url}/${cartToken}/total`

    if (typeof shippingId !== undefined && shippingId) {
      url = `${url}?shipping_id=${shippingId}`
    }

    return http.get(url)
  },

  update (cartToken, params) {
    return http.put(this.url + `/${cartToken}`, params)
  },

  delete (cartToken) {
    return http.delete(this.url + `/${cartToken}`)
  }
}
