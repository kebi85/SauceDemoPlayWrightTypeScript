import { Page, expect } from "@playwright/test";

export abstract class BasePage {
    page: Page;
    url: string;

    constructor(page: Page) {
        this.page = page;
        this.url = '';
    }

    abstract isLoadedAsExpected(): Promise<void>;

    async goto() {
        await this.page.goto(this.url);
        await this.waitForPageLoad();
    }

    async waitForPageLoad() {
        await this.page.waitForLoadState('networkidle');
    }

    async verifyTitle(expectedTitle: string) {
        await expect(this.page).toHaveTitle(expectedTitle);
    }

    async verifyUrl(urlPattern: string | RegExp) {
        await expect(this.page).toHaveURL(urlPattern);
    }

    async takeScreenshot(name: string) {
        await this.page.screenshot({ path: `screenshots/${name}.png` });
    }

    async waitForElement(selector: string, timeout: number = 5000) {
        await this.page.waitForSelector(selector, { timeout });
    }

    async verifyText(selector: string, expectedText: string) {
        const element = this.page.locator(selector);
        await expect(element).toHaveText(expectedText);
    }
}