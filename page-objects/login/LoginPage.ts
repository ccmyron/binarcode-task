import { ElementHandle, Locator, Page } from "@playwright/test";
import { ActiveSessionDetectedModal } from "./ActiveSessionDetectedModal";

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly showPasswordButton: Locator;
    readonly loginButton: Locator;
    readonly signUpLink: Locator;
    readonly forgotPasswordLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator('input[name="email"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.showPasswordButton = page.locator('button[title="Show password"]');
        this.loginButton = page.locator('button[type="submit"]');
        this.signUpLink = page.locator('a[href="/register"]');
        this.forgotPasswordLink = page.locator('a[href="/forgot-password"]');
    }

    async navigate(): Promise<void> {
        await this.page.goto(`${process.env.LOGIN_URL}`);
    }

    async fillEmail(email: string) {
        await this.emailInput.fill(email);
    }

    async fillPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async login(email: string, password: string) {
        await this.navigate();
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.clickLoginButton();

        let activeSessionDetectedModal = new ActiveSessionDetectedModal(this.page);
        let isModalVisible: ElementHandle<SVGElement | HTMLElement>;

        try {
            isModalVisible = await this.page.waitForSelector(activeSessionDetectedModal.modalLocator, { timeout: 5000 });

            if (isModalVisible) {
                await activeSessionDetectedModal.clickYes();
            }
        } catch (error) {
            console.log("Active session modal not detected within timeout");
        }

        // WORKAROUND; TODO: Remove when the login bug is fixed
        try {
            await this.page.getByRole('status', { name: 'Server Error' }).isVisible({ timeout: 6000 });
            console.log('Popup appeared');

            await this.page.reload();
            await this.fillEmail(email);
            await this.fillPassword(password);
            await this.clickLoginButton();
        } catch (error) {
            console.log('Popup did not appear within timeout');
        }
    }
}