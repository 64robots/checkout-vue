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

  update (cartToken, params) {
    return http.put(this.url + `/${cartToken}`, params)
  },

  updateZipCode (cartToken, zipCode) {
    return http.put(this.url + `/${cartToken}/zipcode`, {
      zipcode: zipCode
    })
  },

  updateShipping (cartToken, zipCode) {
    return http.put(this.url + `/${cartToken}/shipping`, {
      zipcode: zipCode
    })
  },

  addOptions (cartToken, options) {
    return http.post(this.url + `/${cartToken}/options`, {
      options: options,
    })
  },

  updateEmail (cartToken, email) {
    return http.put(this.url + `/${cartToken}/email`, {
      customer_email: email,
    })
  },

  addCoupon (cartToken, couponCode) {
    return http.put(this.url + `/${cartToken}/coupon-code`, {
      coupon_code: couponCode,
    })
  },

  removeCoupon (cartToken) {
    return http.delete(this.url + `/${cartToken}/coupon-code`)
  },

  delete (cartToken) {
    return http.delete(this.url + `/${cartToken}`)
  }
}
