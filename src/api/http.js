import axios from 'axios'

export default {
    get (...params) {
        return axios.get(params).then(response => response.data)
    },
    post (...params) {
        return axios.post(...params).then(response => response.data)
    }
}
