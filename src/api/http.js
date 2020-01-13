import axios from 'axios'

export default {
  get (...params) {
    return axios.get(params).then(response => response.data)
  },
  post (...params) {
    return axios.post(...params).then(response => response.data)
  },
  put (...params) {
    return axios.put(...params).then(response => response.data)
  },
  delete (...params) {
    return axios.delete(...params).then(response => response.data)
  }
}
