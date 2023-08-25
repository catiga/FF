import axios from "axios";

console.log('import.meta.env.VITE_BASE_URL::', import.meta.env.VITE_BASE_URL)
// create an axios instance
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // url = base url + request url
  timeout: 60000, // request timeout
  transformRequest: [function (data, headers) {
    return data;
  }],
});

export function setupAxios() {
  
  // request interceptor
  service.interceptors.request.use(
    config => {
      return config
    },
    error => {
      // do something with request error
      console.log(error) // for debug
      return Promise.reject(error)
    }
  )
  
  // response interceptor
  service.interceptors.response.use(
    response => {
      return response.data
    },
    error => {
      try {
        return Promise.reject(error)
      } catch (e) {
        console.log('error caught', e);
      }
    }
  )
}
export { service };
