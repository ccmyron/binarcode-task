import { Page, Locator } from "@playwright/test";
import { MySettingsBillingPage } from "./MySettingsBillingPage";

export class MySettingsGeneralPage {
    private page: Page;
    readonly generalTab: Locator;
    readonly planTab: Locator;
    readonly pricingTab: Locator;
    readonly billingTab: Locator;

    constructor(page: Page) {
        this.page = page;
        this.generalTab = page.locator('#general-tab');
        this.planTab = page.locator('#plan-tab');
        this.pricingTab = page.locator('#pricing-tab');
        this.billingTab = page.locator('#billing-tab');
    }

    async clickGeneralTab() {
        await this.generalTab.click();
    }

    async clickPlanTab() {
        await this.planTab.click();
    }

    async clickPricingTab() {
        await this.pricingTab.click();
    }

    async clickBillingTab() {
        await this.billingTab.click();
        return new MySettingsBillingPage(this.page);
    }

    async isTabActive(tab: Locator): Promise<boolean> {
        return await tab.getAttribute("data-state") === "active";
    }
}
