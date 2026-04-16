import { test } from '@playwright/test';
import { ShopPage } from '../pages/EndtoEndflow/shoppage';
import testData from '../fixtures/testdataflow.json';

test('End-to-end purchase flow', async ({ page }) => {
  const shop = new ShopPage(page);

  await shop.gotoHome();

  await shop.selectFirstProduct();
  await shop.addToCart();

  await shop.openCart();
  await shop.proceedToCheckout();

  await shop.fillCheckoutDetails(testData.user);
  await shop.fillPayment('cash on delivery');

  await shop.verifyConfirmation();
});
