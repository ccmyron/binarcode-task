import { Page, Locator } from "@playwright/test";

export class ActiveSessionDetectedModal {
    readonly page: Page;
    readonly modalLocator: string;
    readonly modal: Locator;
    readonly message: Locator;
    readonly yesButton: Locator;
    readonly noButton: Locator;
    readonly closeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.modalLocator = '[role="alertdialog"]';
        this.modal = page.locator(this.modalLocator);
        this.message = page.locator('#radix-\\:r6\\:');
        this.yesButton = page.locator('button:has-text("Yes")');
        this.noButton = page.locator('button:has-text("No")');
        this.closeButton = page.locator('button:has(svg)');
    }

    async isVisible(): Promise<boolean> {
        return await this.modal.isVisible();
    }

    async getMessage(): Promise<string> {
        return await this.message.textContent() ?? "";
    }

    async clickYes() {
        await this.yesButton.click();
    }

    async clickNo() {
        await this.noButton.click();
    }

    async closeModal() {
        await this.closeButton.click();
    }
}