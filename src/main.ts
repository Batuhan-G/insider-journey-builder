import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/main.css'
import { initSentry } from './core/monitoring/sentry'

async function bootstrap() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./core/mocks/browser')
    await worker.start({ onUnhandledRequest: 'bypass' })
  }

  const app = createApp(App)

  app.use(createPinia())
  app.use(router)

  initSentry(app)

  app.mount('#app')
}

bootstrap()
