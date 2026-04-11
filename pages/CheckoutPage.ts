import { Page, expect } from '@playwright/test';
import { cleanPrice } from '../utils/priceUtils';

export class CheckoutPage {
  constructor(private page: Page) {}

  // wait for checkout page
  async waitForCheckoutPage() {
    await this.page.locator('[data-test="cart-total"]').waitFor();
  }

  // get unit price from checkout
  async getUnitPrice(): Promise<number> {
    const priceText = await this.page.locator('[data-test="product-price"]').innerText();
    return cleanPrice(priceText);
  }

  // get total line price (row total)
  async getLinePrice(): Promise<number> {
    const lineText = await this.page.locator('[data-test="line-price"]').innerText();
    return cleanPrice(lineText);
  }

  // get cart total
  async getCartTotal(): Promise<number> {
    const totalText = await this.page.locator('[data-test="cart-total"]').innerText();
    return cleanPrice(totalText);
  }

  // update quantity (IMPORTANT FIX)
  async updateQuantity(quantity: number) {
    const qtyInput = this.page.locator('[data-test="product-quantity"]');

    await qtyInput.waitFor();
    await qtyInput.click();

    // clear + enter new value
    await qtyInput.fill(String(quantity));

    // trigger UI update
    await this.page.locator('body').click();   // 👈 removes focus
    //await qtyInput.press('Enter');


    // ✅ WAIT for toast (IMPORTANT FIX)
    await this.page.locator('text=Product quantity updated').waitFor();
    // wait for recalculation
    await this.page.waitForTimeout(500);
  }

  // validation logic
  async validateTotalWithQuantity(quantity: number) {
  const unitPrice = await this.getUnitPrice();
  const expectedTotal = unitPrice * quantity;

  // wait until cart total matches expected
  await expect.poll(async () => {
    return await this.getCartTotal();
  }).toBe(expectedTotal);

  const actualLine = await this.getLinePrice();
  expect(actualLine).toBe(expectedTotal);
}
}