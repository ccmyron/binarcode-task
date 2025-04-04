import { Sidebar } from "@pages/sidebar/Sidebar";
import { Page, Locator } from "@playwright/test";
import { MySettingsGeneralPage } from "./MySettingsGeneralPage";
import { TopUpConfirmationModal } from "./TopUpConfirmModal";

export class MySettingsBillingPage {
    private page: Page;
    readonly balance: Locator;
    readonly balanceTooltipButton: Locator;

    readonly paymentMethodButton: Locator;
    readonly addNewCardButton: Locator;
    readonly topUpTabList: Locator;
    readonly oneTimeTab: Locator;
    readonly onLowBalanceTab: Locator;
    readonly topUpAmount50: Locator;
    readonly topUpAmount100: Locator;
    readonly topUpAmount500: Locator;
    readonly customAmountInput: Locator;
    readonly topUpNowButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.balance = page.locator('div.flex.gap-8 p').nth(1);
        this.balanceTooltipButton = page.locator('button[data-state="closed"]');

        this.paymentMethodButton = page.locator('button[role="combobox"]');
        this.addNewCardButton = page.locator('button:text("Add new card")');

        this.topUpTabList = page.locator('[role="tablist"]');
        this.oneTimeTab = page.locator('#radix-\\:re7\\:-trigger-oneTime');
        this.onLowBalanceTab = page.locator('#radix-\\:re7\\:-trigger-onLowBalance');

        this.topUpAmount50 = page.locator('label').filter({ hasText: /^\$50$/ }) // TODO: Ask devs to add class names for these
        this.topUpAmount100 = page.locator('label').filter({ hasText: /^\$100$/ })
        this.topUpAmount500 = page.locator('label').filter({ hasText: /^\$500$/ })
        this.customAmountInput = page.locator('input[name="other_amount"]');
        this.topUpNowButton = page.getByRole('button', { name: 'Top-up now' })
    }

    async navigate() {
        // TODO: Redo this once sidebar profile menu locator is working
        // const profilePopUpMenu = await new Sidebar(this.page).clickProfileButton();
        // const mySettingsGeneralPage = await profilePopUpMenu.clickCompany();
        // const mySettingsBillingPage = await mySettingsGeneralPage.clickBillingTab();

        await this.page.goto(`${process.env.MAIN_URL}company`);
        await this.page.waitForURL(`${process.env.MAIN_URL}company`);
        await new MySettingsGeneralPage(this.page).clickBillingTab();
    }

    async selectOneTimeTab() {
        await this.oneTimeTab.click();
    }

    async selectOnLowBalanceTab() {
        await this.onLowBalanceTab.click();
    }

    async selectTopUpAmount(amount: number) {
        switch (amount) {
            case 50:
                await this.topUpAmount50.click();
                break;
            case 100:
                await this.topUpAmount100.click();
                break;
            case 500:
                await this.topUpAmount500.click();
                break;
            default:
                if (amount !== undefined && amount !== null) {
                    await this.customAmountInput.fill(amount.toString());
                }
                break;
        }
    }

    async clickTopUpNow() {
        await this.page.waitForTimeout(2000); // TODO: Add a condition for this wait
        await this.topUpNowButton.click();
        return new TopUpConfirmationModal(this.page);
    }

    async getBalance(): Promise<number> {
        await this.balance.waitFor({ state: 'visible' });
        let text = await this.balance.innerText();
        return parseFloat(text.replace(/[$,]/g, ''));
    }

    async selectPaymentMethod() {
        await this.paymentMethodButton.click();
    }

    async addNewCard() {
        await this.addNewCardButton.click();
    }
}