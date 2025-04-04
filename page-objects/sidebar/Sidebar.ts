import { Locator, Page } from "@playwright/test";
import { ProfilePopUpMenu } from "./ProfilePopUpMenu";

export class Sidebar {
    readonly page: Page;
    readonly sidebarProfileButton: Locator;
    readonly balance: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sidebarProfileButton = page.locator('.sidebar-profile-card'); // TODO: Check why this locator doesn't work
        this.balance = page.locator('.balance-card span.text-gray-700.font-bold.text-sm'); // TODO Check this one as well
    }

    async clickProfileButton(): Promise<ProfilePopUpMenu> {
        await this.sidebarProfileButton.click();
        return new ProfilePopUpMenu(this.page);
    }

    async getBalanceAmount(): Promise<number> {
        let text = await this.balance.innerText();
        return parseFloat(text.replace(/[$,]/g, ''));
    }
}