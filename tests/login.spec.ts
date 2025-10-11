import { test, expect } from '@playwright/test';
import { PageObjectManager } from '../page-objects/PageObjectManager';
import { Users } from '../test-data/users';
import { ErrorMessages } from '../test-data/errorMessages';
import { NegativeLoginCases } from '../test-data/negativeLoginCases';

test('login successfully', async ({ page }) => {
  const pageObjectManager = new PageObjectManager(page);

  const loginPage = pageObjectManager.getLoginPage();
  await loginPage.goto();
  await loginPage.isLoadedAsExpected();
  await loginPage.login(Users.standard.username, Users.standard.password);

  const inventoryPage = pageObjectManager.getInventoryPage();
  await inventoryPage.isLoadedAsExpected();
});

test('login failed with locked user - original test', async ({ page }) => {
  const pageObjectManager = new PageObjectManager(page);

  const loginPage = pageObjectManager.getLoginPage();
  await loginPage.goto();
  await loginPage.isLoadedAsExpected();
  await loginPage.login(Users.locked.username, Users.locked.password);

  await loginPage.isErrorMessageDisplayed(ErrorMessages.lockedUser);
});

// Data-driven тест - използва данни от test-data папката
test.describe(`Login negative test case`, () => {
  for (const negativeCase of NegativeLoginCases) {
    test(`Login negative test case: ${negativeCase.testName}`, async ({ page }) => {
      const pageObjectManager = new PageObjectManager(page);
      
      const loginPage = pageObjectManager.getLoginPage();
      await loginPage.goto();
      await loginPage.isLoadedAsExpected();
      await loginPage.login(negativeCase.username, negativeCase.password);

      await loginPage.isErrorMessageDisplayed(negativeCase.expectedError);
    });
  }
});



