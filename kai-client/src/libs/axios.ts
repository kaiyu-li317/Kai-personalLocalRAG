import axios from 'axios'
import useUserStore from '@/store/user'
import { baseURL } from '@/config'

// Set baseUrl
axios.defaults.baseURL = baseURL
// Set request headers
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
// Set timeout
axios.defaults.timeout = 30000
// Request interceptor
axios.interceptors.request.use(
  config => {
    const token = useUserStore().getToken
    token && (config.headers['token'] = token)
    return config
  },
  error => {
    return Promise.reject(error)
  }
);

// Response interceptor
axios.interceptors.response.use(
  response => {
    if (response.status == 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    if (!('response' in error)) {
      return Promise.reject(error)
    }
    let data = error.response.data
    if (typeof data === 'string') {
      data = {
        'code': '9999',
        'success': false,
        'data': null,
        'msg': data
      }
    }
    setTimeout(() => {
      if (data.msg) { // Setting message to empty in catch will prevent popup
        if (window.$message) {
          window.$message.destroyAll()
          window.$message.error(data.msg, {
            closable: true, duration: 10000, keepAliveOnHover: false
          })
        }
      }
    }, 200)
    return Promise.reject(data)
  }
)

// Wrap post/get requests
export default {
  post(url:string, data:any, options:any = {}) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url,
        data,
        //data: qs.stringify(data), // Parameter serialization
        ...options
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  get(url:string, data:any, options:any = {}) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url,
        params: data,
        ...options
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  put(url:string, data:any, options:any = {}) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'put',
        url,
        data,
        ...options
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  delete(url:string, data:any, options:any = {}) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'delete',
        url,
        data,
        ...options
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  async fetch(url:string, data:any, callback:Function, options:any = {}) {
    const response = await fetch(axios.defaults.baseURL + url,
      {
        method: 'post',
        responseType: 'stream',
        headers: {
          token: useUserStore().getToken,
          'Content-Type': axios.defaults.headers['Content-Type'],
        },
        body: JSON.stringify(data),
        ...options
      }
    )
    // ok field indicates whether data stream was successfully obtained
    if (!response.ok) {
      if (callback) callback()
      // throw new Error('Network response was not ok')
      return
    }
    // Get a readable stream reader to process response body data as a stream
    const reader = response.body?.getReader()
    if (reader === undefined) {
      if (callback) callback()
      return
    }
    // Decode byte data in stream to text string
    const textDecoder = new TextDecoder()
    let result = true
    while (result) {
      // done indicates if stream has finished reading, value contains the data chunk
      const { done, value } = await reader.read()
      if (done) {
        result = false
        break
      }
      // The value received is the segmented data returned by backend, usually strings starting with data:
      // Need to process data chunks through decode method, e.g., convert to text or other operations
      textDecoder.decode(value).split('\n').forEach(val => {
        if (!val) return
        try {
          // Backend streaming data usually starts with data:, remove data: prefix to get actual data
          // Specific return structure can be agreed with backend
          if (val.startsWith(': ping')) {
            return
          }
          if (callback) {
            let message = val?.replace('data:', '') || ''
            callback(message)
          }
        } catch (err) {
          console.error(err)
        }
      })
    }
  }
}
