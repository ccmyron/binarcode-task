import { Page, Locator } from "@playwright/test";

export class TopUpConfirmationModal {
    private page: Page;
    readonly modal: Locator;
    readonly title: Locator;
    readonly message: Locator;
    readonly amount: Locator;
    readonly noButton: Locator;
    readonly yesButton: Locator;
    readonly closeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.modal = this.page.locator('div[role="alertdialog"]');
        this.title = this.modal.locator('h2');
        this.message = this.modal.locator('div[id^="radix-"] > div.text-gray-500');
        this.amount = this.message.locator('span.font-bold');
        this.noButton = this.modal.locator('button:has-text("No")');
        this.yesButton = this.modal.locator('button:has-text("Yes")');
        this.closeButton = this.modal.locator('button[type="button"] >> nth=2');
    }

    async isVisible(): Promise<boolean> {
        return this.modal.isVisible();
    }

    async getTitleText(): Promise<string> {
        return this.title.innerText();
    }

    async getMessageText(): Promise<string> {
        return this.message.innerText();
    }

    async getAmountText(): Promise<string> {
        return this.amount.innerText();
    }

    async clickNo(): Promise<void> {
        await this.noButton.click();
    }

    async clickYes(): Promise<void> {
        await this.yesButton.click();
    }

    async clickClose(): Promise<void> {
        await this.closeButton.click();
    }

    async confirm(): Promise<void> {
        await this.clickYes();
    }

    async cancel(): Promise<void> {
        await this.clickNo();
    }
}
