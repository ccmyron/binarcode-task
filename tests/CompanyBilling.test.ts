import { test, expect } from '@playwright/test';
import { Sidebar } from "@pages/sidebar/Sidebar";
import { MySettingsBillingPage } from '@pages/my-settings/MySettingsBillingPage';

const AMOUNT_FIRST_OPTION = 50;
const AMOUNT_SECOND_OPTION = 100;
const AMOUNT_THIRD_OPTION = 500;
const AMOUNT_CUSTOM_OPTION = 750;
const BALANCE_UPDATE_TIMEOUT = 3000;

test.use({ storageState: 'playwright/.auth/test-user.json' })

test.beforeEach(async ({ page }) => {
  await page.goto(`${process.env.LANDING_URL}`)
});

test.describe('Top up balance in My Company -> Billing', () => {
  test(`Top up ${AMOUNT_FIRST_OPTION}`, async ({ page }) => {
    const mySettingsBillingPage = new MySettingsBillingPage(page);
    await mySettingsBillingPage.navigate();

    const balanceBeforeTopUp = await mySettingsBillingPage.getBalance();

    await mySettingsBillingPage.selectTopUpAmount(AMOUNT_FIRST_OPTION);
    const topUpConfirmationModal = await mySettingsBillingPage.clickTopUpNow();
    await topUpConfirmationModal.clickYes();

    await page.waitForTimeout(BALANCE_UPDATE_TIMEOUT); // WORKAROUND, BALANCE DOESN'T UPDATE INSTANTLY
    await page.reload();

    const balanceAfterTopUp = await mySettingsBillingPage.getBalance();

    expect(balanceAfterTopUp - balanceBeforeTopUp).toEqual(AMOUNT_FIRST_OPTION);
  });

  test(`Top up ${AMOUNT_SECOND_OPTION}`, async ({ page }) => {
    const mySettingsBillingPage = new MySettingsBillingPage(page);
    await mySettingsBillingPage.navigate();

    const balanceBeforeTopUp = await mySettingsBillingPage.getBalance();

    await mySettingsBillingPage.selectTopUpAmount(AMOUNT_SECOND_OPTION);
    const topUpConfirmationModal = await mySettingsBillingPage.clickTopUpNow();
    await topUpConfirmationModal.clickYes();

    await page.waitForTimeout(BALANCE_UPDATE_TIMEOUT); // WORKAROUND, BALANCE DOESN'T UPDATE INSTANTLY
    await page.reload();

    const balanceAfterTopUp = await mySettingsBillingPage.getBalance();

    expect(balanceAfterTopUp - balanceBeforeTopUp).toEqual(AMOUNT_SECOND_OPTION);
  });

  test(`Top up ${AMOUNT_THIRD_OPTION}`, async ({ page }) => {
    const mySettingsBillingPage = new MySettingsBillingPage(page);
    await mySettingsBillingPage.navigate();

    const balanceBeforeTopUp = await mySettingsBillingPage.getBalance();

    await mySettingsBillingPage.selectTopUpAmount(AMOUNT_THIRD_OPTION);
    const topUpConfirmationModal = await mySettingsBillingPage.clickTopUpNow();
    await topUpConfirmationModal.clickYes();

    await page.waitForTimeout(BALANCE_UPDATE_TIMEOUT); // WORKAROUND, BALANCE DOESN'T UPDATE INSTANTLY
    await page.reload(); 

    const balanceAfterTopUp = await mySettingsBillingPage.getBalance();

    expect(balanceAfterTopUp - balanceBeforeTopUp).toEqual(AMOUNT_THIRD_OPTION);
  });

  test(`Top up ${AMOUNT_CUSTOM_OPTION}`, async ({ page }) => {
    const mySettingsBillingPage = new MySettingsBillingPage(page);
    await mySettingsBillingPage.navigate();

    const balanceBeforeTopUp = await mySettingsBillingPage.getBalance();

    await mySettingsBillingPage.selectTopUpAmount(AMOUNT_CUSTOM_OPTION);
    const topUpConfirmationModal = await mySettingsBillingPage.clickTopUpNow();
    await topUpConfirmationModal.clickYes();

    await page.waitForTimeout(BALANCE_UPDATE_TIMEOUT); // WORKAROUND, BALANCE DOESN'T UPDATE INSTANTLY
    await page.reload();

    const balanceAfterTopUp = await mySettingsBillingPage.getBalance();

    expect(balanceAfterTopUp - balanceBeforeTopUp).toEqual(AMOUNT_CUSTOM_OPTION);
  });
});

test.afterEach(async ({ page }) => {
    await page.close();
});
