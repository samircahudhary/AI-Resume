import axios from 'axios'

axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`
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
