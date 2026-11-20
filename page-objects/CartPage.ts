import { Locator,Page, expect } from "@playwright/test";
import { SauceBasePage } from "./SauceBasePage";

export class CartPage extends SauceBasePage {
    url = 'https://www.saucedemo.com/cart.html';
    title = 'Swag Labs';
    itemNames: Locator;
    addedItemNames: string[] = [];

    constructor(page: Page) {
        super(page);
        this.title = 'Swag Labs';
        this.itemNames = this.page.locator('.inventory_item_name');
    }

    async isLoadedAsExpected() {
        await expect(this.page).toHaveURL(this.url);
        await expect(this.page.locator('.app_logo')).toHaveText(this.title);
    }

    async getAllItemNamesInCart() {
        return await this.itemNames.allTextContents();
    }

    async getAddedItemNames() {
        this.addedItemNames = await this.itemNames.allTextContents();
        return this.addedItemNames;
    }
}