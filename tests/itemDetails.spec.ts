import { PageObjectManager } from "../page-objects/PageObjectManager";
import { Users } from "../test-data/users";
import { test, expect } from '@playwright/test';

test('validate item details page', async ({page}) => {
    const pageObjectManager = new PageObjectManager(page);

    const loginPage = pageObjectManager.getLoginPage();
    await loginPage.goto();
    await loginPage.login(Users.standard.username, Users.standard.password);
    const inventoryPage = pageObjectManager.getInventoryPage();
    const inventoryNames: string[] = await inventoryPage.getAllInventoryItemNames();
    const inventoryPrices = await inventoryPage.getAllInventoryItemPrices();
    await inventoryPage.clickInventoryItemName(0);
    
    const itemPage = pageObjectManager.getItemPage();
    await itemPage.isLoadedAsExpected();
    await itemPage.verifyItemName(inventoryNames[0]);
    await itemPage.verifyItemPrice(inventoryPrices[0]);
});