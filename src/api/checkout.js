import http from './http'

export default {
    url: '/api/checkout',

    settings () {
        return http.get(this.url + '/settings')
    }
}
