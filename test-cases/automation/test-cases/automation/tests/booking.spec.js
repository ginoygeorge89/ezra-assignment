const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');

test('User can login and see dashboard', async ({ page }) => {
  const login = new LoginPage(page);

  await login.goto();
  await login.loginWithEmail('YOUR_TEST_EMAIL_HERE');

  await expect(page).toHaveURL(/dashboard/);
});
