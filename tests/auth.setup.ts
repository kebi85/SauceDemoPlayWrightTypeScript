import { test as setup } from '@playwright/test';
import { PageObjectManager } from '../page-objects/PageObjectManager';
import { Users } from '../test-data/users';

export const STORAGE_STATE = '.auth/user.json';

setup('login as standard user', async ({ page }) => {
    const pageObjectManager = new PageObjectManager(page);

    const loginPage = pageObjectManager.getLoginPage();
    await loginPage.goto();
    await loginPage.login(Users.standard.username, Users.standard.password);

    await pageObjectManager.getInventoryPage().isLoadedAsExpected();

    // Записваме cookies и localStorage — project 'chromium' ще ги зареди.
    await page.context().storageState({ path: STORAGE_STATE });
});
