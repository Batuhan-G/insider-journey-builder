import * as Sentry from '@sentry/vue'
import type { App } from 'vue'
import router from '@/router'

export function initSentry(app: App): void {
  if (!import.meta.env.VITE_SENTRY_DSN) return

  Sentry.init({
    app,
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: import.meta.env.VITE_APP_ENV ?? 'development',
    integrations: [
      Sentry.browserTracingIntegration({ router }),
      Sentry.replayIntegration(),
    ],
    tracePropagationTargets: ['localhost', import.meta.env.VITE_API_BASE_URL].filter(Boolean),
    tracesSampleRate: import.meta.env.VITE_APP_ENV === 'production' ? 0.2 : 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  })
}
