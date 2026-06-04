import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:8080/api',
})

// Attach Clerk JWT token to every request
API.interceptors.request.use(async (config) => {
  try {
    // window.__clerk__ is set by ClerkProvider
    const clerk = window.Clerk
    if (clerk?.session) {
      const token = await clerk.session.getToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
  } catch (e) {
    console.warn('Could not attach auth token:', e)
  }
  return config
})

export default API
