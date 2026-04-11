import { Page, expect } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

 // After-login validation + navigation
  async validateAndGoToHome() {

    // 1. Validate "My account" title
    await expect(this.page.locator('[data-test="page-title"]'))
      .toHaveText('My account');

    // 2. Validate navigation menu
    await expect(this.page.locator('[data-test="nav-menu"]'))
      .toBeVisible();

    // 3. Validate Home is visible
    const homeLink = this.page.locator('[data-test="nav-home"]');
    await expect(homeLink).toBeVisible();

    // 4. Click Home
    await homeLink.click();

    // 5. Wait for products to load
    await this.page.locator('[data-test^="product-"]').first().waitFor();
  }

  async selectFirstProduct() {
    const product = this.page.locator('[data-test^="product-"]').first();
    await product.scrollIntoViewIfNeeded();
    await product.click();
  }

  async addFirstProductToCart() {
    const addToCartBtn = this.page.locator('#btn-add-to-cart');
    await addToCartBtn.waitFor();
    await addToCartBtn.click();
  }

  async validateAddToCartToast() {
  const toast = this.page.locator('#toast-container');
  await expect(toast).toBeVisible();
  await expect(toast).toContainText('added');
  }

  async openCart() {
    await this.page.getByRole('link', { name: 'Cart' }).click();
  }
  


  
} 