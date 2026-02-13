const { test, expect } = require('@playwright/test');

test('User can start booking flow', async ({ page }) => {

  await page.goto('https://myezra-staging.ezra.com/');

  // Login
  await page.fill('#email', 'imginoygeorge@gmail.com');
  await page.fill('#password', 'Welcome@Test');
  await page.click('button[type="submit"]');

  // Verify dashboard loads
  await expect(page.locator('text=Appointments')).toBeVisible();

  // Click Book a scan
  await page.click('text=Book a scan');

  // Verify plan selection page opens
  await expect(page).toHaveURL(/select-plan/);

  // Verify Continue button disabled initially
  await expect(page.locator('button:has-text("Continue")')).toBeDisabled();
});
