import { InventoryPage } from "./InventoryPage"
import { Page } from "@playwright/test";
import { ItemPage } from "./ItemPage";
import { LoginPage } from "./LoginPAge";

export class PageObjectManager {
    private loginPage: LoginPage;
    private inventoryPage: InventoryPage;
    private itemPage: ItemPage;

    constructor(page: Page) {
        this.loginPage = new LoginPage(page);
        this.inventoryPage = new InventoryPage(page);
        this.itemPage = new ItemPage(page);
    }

    getLoginPage(): LoginPage {
        return this.loginPage;
    }

    getInventoryPage(): InventoryPage {
        return this.inventoryPage;
    }

    getItemPage(): ItemPage {
        return this.itemPage;
    }
}