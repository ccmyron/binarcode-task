import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '@pages/login/LoginPage';
import path from 'path';

const AUTH_FILE = path.join(__dirname, '../playwright/.auth/test-user.json');

setup('authenticate', async ({ page }) => {
  await new LoginPage(page).login(`${process.env.USER_EMAIL}`, `${process.env.USER_PASSWORD}`);
  await page.waitForURL(`${process.env.LANDING_URL}`);
  await page.context().storageState({ path: AUTH_FILE });
});

setup.afterEach(async ({ page }) => {
    await page.close();
});
