import http from './http'

export default {
  url: '/api/orders',

  create (params) {
    return http.post(`${this.url}?token=${params.auth_token}`, params)
  },

  get (id) {
    return http.get(`/api/my/orders/${id}`)
  }
}
