# Playwright E2E Setup

This file documents how to run the Playwright end-to-end tests for this project.

Prerequisites:
- Node.js >= 18
- npm

Install dependencies:
```bash
npm install
```

Install Playwright browsers (one-time step):
```bash
npx playwright install
```

Run Playwright tests:
```bash
npm run test:e2e
```

Run Playwright tests in headed mode (useful for debugging):
```bash
npm run test:e2e:headed
```

View HTML report after tests run:
```bash
npm run test:e2e:report
```

Notes:
- Tests mock external API calls (jsonplaceholder) for stable, deterministic behavior.
- Playwright will start the dev server automatically via the `webServer` option in `playwright.config.ts`.
- If you run Playwright tests in CI, you can set CI=true to force retries and disallow `test.only`.
