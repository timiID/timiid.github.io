import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'

// fallback title (kalau kosong)
if (!document.title) {
  document.title = 'Timi DB | Toram Online Database'
}

const app = createApp(App)
app.use(router)

// 🔥 HANDLE REDIRECT DARI 404.html (GITHUB PAGES FIX)
router.isReady().then(() => {
  const redirect = sessionStorage.redirect

  if (redirect) {
    sessionStorage.removeItem('redirect')

    // hindari replace ke path yang sama
    if (redirect !== router.currentRoute.value.fullPath) {
      router.replace(redirect)
    }
  }
})

app.mount('#app')

// ignore async error (optional)
window.addEventListener('unhandledrejection', e => {
  console.warn('Ignored async listener error:', e.reason)
})