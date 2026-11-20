import { InventoryPage } from "./InventoryPage"
import { Page } from "@playwright/test";
import { ItemPage } from "./ItemPage";
import { LoginPage } from "./LoginPage";
import { CartPage } from "./CartPage";

export class PageObjectManager {
    private loginPage: LoginPage;
    private inventoryPage: InventoryPage;
    private itemPage: ItemPage;
    private cartPage: CartPage;

    constructor(page: Page) {
        this.loginPage = new LoginPage(page);
        this.inventoryPage = new InventoryPage(page);
        this.itemPage = new ItemPage(page);
        this.cartPage = new CartPage(page);
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

    getCartPage(): CartPage {
        return this.cartPage;
    }
}