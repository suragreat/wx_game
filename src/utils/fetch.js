import axios from 'axios'
import {
  getToken
} from './auth';

const service = axios.create({
  timeout: 5000
})

service.interceptors.request.use(config => {
  var token = getToken()

  if (token) {
    config.headers['x-token-jwt'] = token;
  }
  return config
}, error => {
  console.log(error)
})

service.interceptors.response.use(
  response => {
    console.log("***********************response***********************")
    console.log(response)
    if (response.data.status == 200) {
      return response
    } else if (response.data.status === 302) {
      console.log("redirect to " + response.data.message)
      window.location = response.data.message
      return response
    } else {
      console.log('status: ' + response.data.status + ", message: " + response.data.message)
      return Promise.reject(response.data.message);
    }
  },
  error => {
    console.log(error)
    console.log(error.response)
    return Promise.reject('服务请求失败');
  }
)

export default service
