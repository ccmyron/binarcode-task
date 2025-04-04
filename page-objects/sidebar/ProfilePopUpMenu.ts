import { MySettingsGeneralPage } from "@pages/my-settings/MySettingsGeneralPage";
import { Page, Locator } from "@playwright/test";

export class ProfilePopUpMenu {
    readonly page: Page;
    readonly profileButton: Locator;
    readonly companyButton: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.profileButton = page.locator('[data-sidebar-button="/profile"]');
        this.companyButton = page.locator('[data-sidebar-button="/company"]');
        this.logoutButton = page.locator('div[aria-controls="radix-:r7k:"]');
    }

    async clickProfile() {
        await this.profileButton.click();
    }

    async clickCompany() {
        await this.companyButton.click();
        return new MySettingsGeneralPage(this.page);
    }

    async clickLogout() {
        await this.logoutButton.click();
    }

    async isVisible(): Promise<boolean> {
        return await this.profileButton.isVisible();
    }
}