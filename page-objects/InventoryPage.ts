import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class InventoryPage extends BasePage {
    url = 'https://www.saucedemo.com/inventory.html';
    title = 'Swag Labs';
    productsTitle: Locator;
    inventoryItemNames: Locator;
    savedInventoryItemNames: string[] = [];
    inventoryItemPrices: Locator;
    savedInventoryItemPrices: string[] = [];

    constructor(page: Page) {
        super(page);
        this.productsTitle = page.locator('.title:has-text("Products")');
        this.inventoryItemNames = page.locator('.inventory_item_name');
        this.inventoryItemPrices = page.locator('.inventory_item_price');
    }

    async isLoadedAsExpected() {
        await this.waitForPageLoad();
        await this.waitForUrl();
        await this.verifyTitle();
        await expect(this.productsTitle).toBeVisible();
        await expect(this.productsTitle).toHaveText('Products');
    }

    async getAllInventoryItemNames() {
        return await this.inventoryItemNames.allTextContents();
    }

    async saveAllInventoryItemNames() {
        this.savedInventoryItemNames = await this.inventoryItemNames.allTextContents();
        return this.savedInventoryItemNames;
    }

    getSavedInventoryItemNames() {
        return this.savedInventoryItemNames;
    }

    async clickInventoryItemName(itemNumber: number) {
        const itemName = this.inventoryItemNames.nth(itemNumber);
        await expect(itemName).toBeVisible();
        await itemName.click();
    }

    async getAllInventoryItemPrices() {
        return await this.inventoryItemPrices.allTextContents();
    }

    async saveAllInventoryItemPrices() {
        this.savedInventoryItemPrices = await this.inventoryItemPrices.allTextContents();
        return this.savedInventoryItemPrices;
    }
}