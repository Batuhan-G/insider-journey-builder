# Skill: Write Playwright E2E Tests

Use this guide for all end-to-end tests in `tests/e2e/`.

---

## Config

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
})
```

---

## Selector Priority

Always prefer semantic selectors. This makes tests resilient to styling changes.

```typescript
// 1st choice — Role (most resilient)
page.getByRole('button', { name: /submit/i })

// 2nd choice — Label (for form elements)
page.getByLabel('Email address')

// 3rd choice — Visible text
page.getByText('Add Trigger')

// 4th choice — Placeholder
page.getByPlaceholder('Search journeys...')

// Last resort — data-testid (add to component: data-testid="journey-canvas")
page.getByTestId('journey-canvas')
```

---

## Journey Builder E2E Example

```typescript
// tests/e2e/journey-builder.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Journey Builder', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/journey/new')
    await expect(page).toHaveTitle(/Journey Builder/)
  })

  test('user can add a trigger node to the canvas', async ({ page }) => {
    // Arrange: Open the node type sidebar
    await page.getByRole('button', { name: /add node/i }).click()

    // Act: Click on Trigger type
    await page.getByRole('option', { name: /user visits page/i }).click()

    // Assert: Trigger appears on canvas
    const canvas = page.getByTestId('journey-canvas')
    await expect(canvas).toContainText('User Visits Page')
    await expect(canvas.getByRole('article')).toHaveCount(1)
  })

  test('user can connect two nodes', async ({ page }) => {
    await page.getByTestId('node-trigger').dragTo(page.getByTestId('node-action'))

    await expect(page.getByTestId('journey-edge')).toBeVisible()
  })

  test('validation error appears when journey has no trigger', async ({ page }) => {
    // Add only an action node
    await page.getByRole('button', { name: /add action/i }).click()
    
    // Try to save
    await page.getByRole('button', { name: /save journey/i }).click()

    await expect(page.getByRole('alert')).toContainText('Journey must start with a trigger')
  })

  test('completed journey can be saved', async ({ page }) => {
    // Full happy path
    await page.getByTestId('add-trigger-btn').click()
    await page.getByTestId('add-condition-btn').click()
    await page.getByTestId('add-action-btn').click()

    await page.getByRole('button', { name: /save journey/i }).click()

    await expect(page.getByRole('status')).toContainText('Journey saved successfully')
  })
})
```

---

## Page Object Model (for larger test suites)

```typescript
// tests/e2e/pages/JourneyBuilderPage.ts
import { Page } from '@playwright/test'

export class JourneyBuilderPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('/journey/new')
  }

  async addTriggerNode(triggerType: string) {
    await this.page.getByRole('button', { name: /add node/i }).click()
    await this.page.getByRole('option', { name: triggerType }).click()
  }

  async saveJourney() {
    await this.page.getByRole('button', { name: /save/i }).click()
  }

  get canvas() {
    return this.page.getByTestId('journey-canvas')
  }

  get validationAlert() {
    return this.page.getByRole('alert')
  }
}
```
