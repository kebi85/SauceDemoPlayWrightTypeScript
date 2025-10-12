import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
    url = 'https://www.saucedemo.com/';
    title = 'Swag Labs';
    userNameInput: Locator;
    passwordInput: Locator;
    loginButton: Locator;
    errorMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.userNameInput = page.locator("#user-name");
        this.passwordInput = page.locator("#password");
        this.loginButton = page.locator("#login-button");
        this.errorMessage = page.locator("#login_button_container .error-message-container h3");
    }

    async isLoadedAsExpected() {
        await this.waitForPageLoad();
        await this.waitForUrl();
        await this.verifyTitle();
        await expect(this.userNameInput).toBeVisible();
        await expect(this.passwordInput).toBeVisible();
        await expect(this.loginButton).toBeVisible();
    }

    async login(user: string, password: string) {
        await this.userNameInput.fill(user);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async isErrorMessageDisplayed(expectedErrorMessage: string) {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toHaveText(expectedErrorMessage);
    }
}