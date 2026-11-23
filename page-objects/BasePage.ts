import { Locator, Page, expect } from "@playwright/test";

export abstract class BasePage {
    page: Page;
    url: string;
    title: string;

    constructor(page: Page) {
        this.page = page;
        this.url = '';
        this.title = '';
    }

    abstract isLoadedAsExpected(): Promise<void>;

    getById(id: string): Locator {
        return this.page.locator(`[id="${id}"]`);
    }

    async goto() {
        await this.page.goto(this.url);
    }

    async waitForUrl(urlPattern?: string | RegExp) {
        const targetUrl = urlPattern || this.url;
        
        if (typeof targetUrl === 'string' && !targetUrl.includes('*')) {
            // Добавяме wildcard за query parameters
            const flexibleUrl = targetUrl.includes('?') ? targetUrl : `${targetUrl}*`;
            await this.page.waitForURL(flexibleUrl);
        } else {
            await this.page.waitForURL(targetUrl);
        }
    }

    async verifyTitle() {
        await expect(this.page).toHaveTitle(this.title);
    }

    async verifyUrl(urlPattern?: string | RegExp) {
        const targetUrl = urlPattern || this.url;
        await expect(this.page).toHaveURL(targetUrl);
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