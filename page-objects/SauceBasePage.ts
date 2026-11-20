import { BasePage } from "./BasePage";
import { Locator,Page, expect } from "@playwright/test";

export class SauceBasePage extends BasePage {
    basketBtn: Locator;
    burgerMenu: Locator;
    twitterBtn: Locator;
    facebookBtn: Locator;
    linkedinBtn: Locator;

    constructor(page: Page) {
        super(page)
        this.basketBtn = page.locator("#shopping_cart_container");
        this.burgerMenu = page.locator("#react-burger-menu-btn")
        this.twitterBtn = page.locator(".social_twitter");
        this.facebookBtn = page.locator(".social_facebook");
        this.linkedinBtn = page.locator(".social_linkedin");
    }

    async isLoadedAsExpected() {
        await expect(this.basketBtn).toBeVisible();
        await expect(this.burgerMenu).toBeVisible();
        await expect(this.twitterBtn).toBeVisible();
        await expect(this.facebookBtn).toBeVisible();
        await expect(this.linkedinBtn).toBeVisible();
    }

    async goToBasket() {
        await this.basketBtn.click();
    }

    async openBurgerMenu() {
        await this.burgerMenu.click();
    }
    
    async clickTwitterBtn() {
        await this.twitterBtn.click();
    }

    async gotToFacebook() {
        await this.facebookBtn.click();
    }

    async goToLinkedin() {
        await this.linkedinBtn.click();
    }
}