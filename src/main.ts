import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/main.css'
import { initSentry } from './core/monitoring/sentry'

async function prepare(): Promise<void> {
  if (import.meta.env.DEV) {
    const { worker } = await import('./core/mocks/browser')
    await worker.start({
      onUnhandledRequest(request, print) {
        const url = new URL(request.url)
        if (url.pathname.startsWith('/src/')) return
        if (url.hostname.includes('sentry.io')) return
        print.warning()
      },
    })
  }
}

prepare().then(() => {
  const app = createApp(App)

  initSentry(app)

  app.use(createPinia())
  app.use(router)

  app.mount('#app')
})
