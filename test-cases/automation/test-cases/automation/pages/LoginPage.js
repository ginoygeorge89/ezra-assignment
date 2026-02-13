const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('input[type="email"]');
    this.googleButton = page.locator('text=Sign in as');
  }

  async goto() {
    await this.page.goto('/');
  }

  async loginWithEmail(email) {
    await this.emailInput.fill(email);
    await this.page.keyboard.press('Enter');
  }
}

module.exports = LoginPage;
