const axios = require('axios')

const axiosInstance = axios.create({
  baseURL: window.URL_API
})

module.exports = axiosInstance
