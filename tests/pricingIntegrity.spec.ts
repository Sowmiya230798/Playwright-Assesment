import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/PriceIntegrity/LoginPage';
import { HomePage } from '../pages/PriceIntegrity/HomePage';
import { CheckoutPage } from '../pages/PriceIntegrity/CheckoutPage';

import * as dotenv from 'dotenv';
import * as path from 'path';
 
// Load env
dotenv.config({ path: path.resolve(process.cwd(), '.env.qa') });

test.describe('Pricing Integrity Tests', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto(process.env.BASE_URL!);

    // Login flow
    await loginPage.goToLogin();
    await loginPage.login(process.env.EMAIL!, process.env.PASSWORD!);
    await loginPage.waitForLoginSuccess();
  });

   test('Add product to cart & Checkout quantity total validation', async ({ page }) => {

    const home = new HomePage(page);
    const checkout = new CheckoutPage(page);


    // Navigate to Home & products
    await home.validateAndGoToHome();

    // Select product
    await home.selectFirstProduct();

    // Add to cart
    await home.addFirstProductToCart();

    // Validate toaster
    await home.validateAddToCartToast();

    // Open cart
    await home.openCart();

    // Validate cart page loaded
    await expect(page).toHaveURL(/checkout/);

    // Wait for checkout page to load properly
    await checkout.waitForCheckoutPage();

    // Quantity update
    const quantity = 3;
    await checkout.updateQuantity(quantity);

    // Validate price integrity
    await checkout.validateTotalWithQuantity(quantity);
  });

});

 

 
