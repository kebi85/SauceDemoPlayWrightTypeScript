import { LoginPage } from "./LoginPage"
import { InventoryPage } from "./InventoryPage"
import { Page } from "@playwright/test";

export class PageObjectManager {
    private loginPage: LoginPage;
    private inventoryPage: InventoryPage;

    constructor(page: Page) {
        this.loginPage = new LoginPage(page);
        this.inventoryPage = new InventoryPage(page);
    }

    getLoginPage(): LoginPage {
        return this.loginPage;
    }

    getInventoryPage(): InventoryPage {
        return this.inventoryPage;
    }
}