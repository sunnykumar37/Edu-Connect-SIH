import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Let callers handle 401s to support fallback logic (e.g., student vs teacher)
api.interceptors.response.use(
  (r) => r,
  (error) => Promise.reject(error)
)

export default api


