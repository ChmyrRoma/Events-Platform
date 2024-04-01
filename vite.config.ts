import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.REACT_API_BASE_URL': JSON.stringify(env.REACT_API_BASE_URL),
      'process.env.REACT_USER_CAPTCHA': JSON.stringify(env.REACT_USER_CAPTCHA)
    },
    plugins: [react()],
  }
})
