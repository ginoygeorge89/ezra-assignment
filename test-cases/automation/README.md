
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

----

## Test Selection Rationale

For automation I focused on the highest-impact user journeys rather than broad UI coverage.

### Automated flows

1. **Login and Dashboard Load**
   - Confirms authentication works and environment is reachable
   - Provides fast signal if staging is down or broken

2. **Booking Entry Validation**
   - Protects the core booking journey
   - Ensures required selections block progression

3. **Payment Validation Handling**
   - Ensures incomplete payments cannot proceed
   - Protects revenue path and booking data integrity

---

## Trade-offs and Assumptions

- Focused on business-critical flows instead of full regression automation
- Payment automation validates behavior rather than completing real transactions to keep tests stable
- Selectors rely on visible text and attributes available in staging
- In production, I would request dedicated test IDs for long-term stability

---

## Scalability and Future Improvements

This project uses a Page Object Model structure so that:

- Page logic is reusable across tests
- Selectors are centralized for easier maintenance
- New tests can be added quickly without duplication

Future enhancements I would implement:

- CI/CD pipeline execution
- Environment configuration via variables
- API-level assertions alongside UI checks
- Privacy and authorization negative tests
- Reporting integration for build visibility
