import { PageObjectManager } from "../page-objects/PageObjectManager";
import { test, expect } from '@playwright/test';

test.describe('Item details page tests', () => {
    test('validate item details page', async ({page}) => {
        const pageObjectManager = new PageObjectManager(page);

        // Вече сме логнати (globalSetup + storageState) — отиваме директно на продуктите
        const inventoryPage = pageObjectManager.getInventoryPage();
        await inventoryPage.goto();
        const inventoryNames: string[] = await inventoryPage.getAllInventoryItemNames();
        const inventoryPrices: string[] = await inventoryPage.getAllInventoryItemPrices();
        await inventoryPage.clickInventoryItemName(0);
    
        const itemPage = pageObjectManager.getItemPage();
        await itemPage.isLoadedAsExpected();
        await itemPage.verifyItemName(inventoryNames[0]);
        await itemPage.verifyItemPrice(inventoryPrices[0]);

        await itemPage.returnToAllProducts();
        await inventoryPage.isLoadedAsExpected();
    });

    test ('add item to cart form details page', async ({page}) => {
        const pageObjectManager = new PageObjectManager(page);

        // Вече сме логнати (globalSetup + storageState) — отиваме директно на продуктите
        const inventoryPage = pageObjectManager.getInventoryPage();
        await inventoryPage.goto();
        const inventoryNames: string[] = await inventoryPage.getAllInventoryItemNames();
        const inventoryPrices: string[] = await inventoryPage.getAllInventoryItemPrices();
        await inventoryPage.clickInventoryItemName(0);

        const itemPage = pageObjectManager.getItemPage();
        await itemPage.addItemToCart();
        await itemPage.goToBasket();

        const cartPage = pageObjectManager.getCartPage();
        await cartPage.isLoadedAsExpected();
        const addedItemsNames: string[] = await cartPage.getAddedItemNames();
        expect(addedItemsNames[0]).toEqual(inventoryNames[0]);
    });
});

