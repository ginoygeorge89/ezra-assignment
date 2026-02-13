const { test, expect } = require('@playwright/test');

test('User can login and see dashboard', async ({ page }) => {

  // Go to login page
  await page.goto('https://myezra-staging.ezra.com/');

  // Fill email
  await page.fill('#email', 'imginoygeorge@gmail.com');

  // Fill password
  await page.fill('#password', 'Welcome@Test');

  // Click submit
  await page.click('button[type="submit"]');

  // Verify dashboard loads
  await expect(page.locator('text=Appointments')).toBeVisible();

  // Verify Book a scan button exists
  await expect(page.locator('text=Book a scan')).toBeVisible();
});
