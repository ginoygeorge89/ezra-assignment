const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  use: {
    headless: true,
    baseURL: 'https://myezra-staging.ezra.com',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});
