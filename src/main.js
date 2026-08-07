import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'

// Fallback title (kalau kosong)
if (!document.title) {
  document.title = 'Timi DB | Toram Online Database'
}

const app = createApp(App)

app.use(router)

const disableAutofillForInputs = (root = document) => {
  root.querySelectorAll('input, textarea, select').forEach((el) => {
    const type = (el.getAttribute('type') || '').toLowerCase()
    if (['hidden', 'submit', 'button', 'reset', 'image'].includes(type)) return

    el.setAttribute('autocomplete', 'off')
    el.setAttribute('autocorrect', 'off')
    el.setAttribute('autocapitalize', 'off')
    el.setAttribute('spellcheck', 'false')
    el.setAttribute('autofill', 'off')
    el.setAttribute('data-lpignore', 'true')
    el.setAttribute('data-form-type', 'other')
  })
}

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

  disableAutofillForInputs()
})

router.afterEach(() => {
  disableAutofillForInputs()
})

//MOUNT THE APP
app.mount('#app')