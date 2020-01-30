import http from './http'

export default {
  url: '/api/orders',

  create (params) {
    return http.post(`${this.url}?token=${params.auth_token}`, params)
  },

  get (orderToken, authToken) {
    return http.get(`${this.url}/${orderToken}?token=${authToken}`)
  }
}
