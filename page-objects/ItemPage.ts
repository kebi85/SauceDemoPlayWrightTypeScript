import { Locator,Page, expect } from "@playwright/test";
import { SauceBasePage } from "./SauceBasePage";


export class ItemPage extends SauceBasePage {
    url = 'https://www.saucedemo.com/inventory-item.html*'; // Добавяме * за параметри
    title = 'Swag Labs';
    backToProductsBtn: Locator;
    itemName: Locator;
    addToCartBtn: Locator;
    price: Locator;


    constructor(page: Page) {
        super(page);
        this.itemName = page.locator('.inventory_details_name');
        this.backToProductsBtn = page.locator('#back-to-products');
        this.addToCartBtn = page.locator("#add-to-cart");
        this.price = page.locator('.inventory_details_price');
    }

    async isLoadedAsExpected() {
        await this.waitForPageLoad();
        await this.waitForUrl();
        await this.verifyTitle();
        await expect(this.itemName).toBeVisible();
        await expect(this.addToCartBtn).toBeVisible();
        await expect(this.price).toBeVisible();
    }

    async returnToAllProducts() {
        await this.backToProductsBtn.click();
    }

    async addItemToCart() {
        await this.addToCartBtn.click();
    }           

    async verifyItemName(expectedName: string) {
        await expect(this.itemName).toHaveText(expectedName);
    }       

    async verifyItemPrice(expectedPrice: string) {
        await expect(this.price).toHaveText(expectedPrice);
    }
}