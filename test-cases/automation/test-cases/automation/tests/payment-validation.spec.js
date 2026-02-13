const { test, expect } = require('@playwright/test');

test('Payment validation prevents empty submission', async ({ page }) => {

  await page.goto('https://myezra-staging.ezra.com/');

  // Login
  await page.fill('#email', 'imginoygeorge@gmail.com');
  await page.fill('#password', 'Welcome@test');
  await page.click('button[type="submit"]');

  // Start booking
  await page.click('text=Book a scan');

  // Select MRI plan
  await page.click('text=MRI Scan');
  await page.click('button:has-text("Continue")');

  // Select any available location/date/time
  await page.locator('[role="button"]').filter({ hasText: ':' }).first().click();
  await page.click('button:has-text("Continue")');

  // On payment page try to submit empty form
  await page.click('button:has-text("Continue")');

  // Verify validation errors appear
  await expect(page.locator('text=incomplete')).toBeVisible();
});
