import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  private page: Page;

  private locators: {
    pageTitle: Locator;
    navMenu: Locator;
    homeLink: Locator;
    productList: Locator;
    addToCartBtn: Locator;
    toast: Locator;
    cartLink: Locator;
  };

  constructor(page: Page) {
    this.page = page;

    this.locators = {
      pageTitle: this.page.getByRole('heading', { name: 'My account' }),
      navMenu: this.page.locator('[data-test="nav-menu"]'),
      homeLink: this.page.getByRole('link', { name: 'Home' }),
      productList: this.page.locator('[data-test^="product-"]'),
      addToCartBtn: this.page.locator('#btn-add-to-cart'),
      toast: this.page.locator('#toast-container'),
      cartLink: this.page.getByRole('link', { name: /cart/i }),
    };
  }

  async validateAndGoToHome() {
    await expect(this.locators.pageTitle).toHaveText('My account');
    await expect(this.locators.navMenu).toBeVisible();

    await this.locators.homeLink.click();
    await this.locators.productList.first().waitFor();
  }

  async selectFirstProduct() {
    await this.locators.productList.first().click();
  }

  async addFirstProductToCart() {
    await this.locators.addToCartBtn.click();
  }

  async validateAddToCartToast() {
    await expect(this.locators.toast).toBeVisible();
    await expect(this.locators.toast).toContainText('added');
  }

  async openCart() {
    await this.locators.cartLink.click();
  }
}






















/*import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  private page: Page;

  private locators: {
    pageTitle: Locator;
    navMenu: Locator;
    homeLink: Locator;
    productList: Locator;
    addToCartBtn: Locator;
    toast: Locator;
    cartLink: Locator;
  };

  constructor(page: Page) {
    this.page = page;

    this.locators = {
      pageTitle: this.page.locator('[data-test="page-title"]'),
      navMenu: this.page.locator('[data-test="nav-menu"]'),
      homeLink: this.page.locator('[data-test="nav-home"]'),
      productList: this.page.locator('[data-test^="product-"]'),
      addToCartBtn: this.page.locator('#btn-add-to-cart'),
      toast: this.page.locator('#toast-container'),
      cartLink: this.page.getByRole('link', { name: 'Cart' }),
    };
  }

  async validateAndGoToHome() {
    await expect(this.locators.pageTitle).toHaveText('My account');
    await expect(this.locators.navMenu).toBeVisible();

    await this.locators.homeLink.click();
    await this.locators.productList.first().waitFor();
  }

  async selectFirstProduct() {
    await this.locators.productList.first().click();
  }

  async addFirstProductToCart() {
    await this.locators.addToCartBtn.click();
  }

  async validateAddToCartToast() {
    await expect(this.locators.toast).toBeVisible();
    await expect(this.locators.toast).toContainText('added');
  }

  async openCart() {
    await this.locators.cartLink.click();
  }
}
*/





















/*import { Page, expect } from '@playwright/test';

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
  


  
}  */