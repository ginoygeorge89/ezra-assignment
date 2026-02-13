
# Automation Setup – Playwright

This folder contains UI automation for key booking flow scenarios.

## Tech stack
- Playwright
- JavaScript
- Page Object Model structure

## Setup steps

1. Install Node.js (v18 or higher)
2. Clone this repository
3. Open terminal in the automation folder
4. Run:

npm init -y
npm install -D @playwright/test
npx playwright install

## Run tests

npx playwright test

## Notes

- Tests target staging environment
- Sensitive data is masked or uses test accounts
- Focus is on critical booking flow coverage
