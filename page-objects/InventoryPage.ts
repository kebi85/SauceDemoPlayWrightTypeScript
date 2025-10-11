import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class InventoryPage extends BasePage {
    url = 'https://www.saucedemo.com/inventory.html';
    productsTitle: Locator;

    constructor(page: Page) {
        super(page);
        this.productsTitle = page.locator('.title:has-text("Products")');
    }

    async isLoadedAsExpected() {
        await this.waitForPageLoad();
        await this.page.waitForURL(this.url);
        await expect(this.productsTitle).toBeVisible();
        await expect(this.productsTitle).toHaveText('Products');
    }
}