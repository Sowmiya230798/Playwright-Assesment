import { Page, Locator, expect } from '@playwright/test';
import { cleanPrice } from '../../utils/priceUtils';

export class CheckoutPage {
  private page: Page;

  private locators: {
    cartTotal: Locator;
    productPrice: Locator;
    linePrice: Locator;
    quantityInput: Locator;
    toast: Locator;
    body: Locator;
  };

  constructor(page: Page) {
    this.page = page;

    this.locators = {

      cartTotal: this.page.getByRole('row', { name: /total/i }).locator('td').nth(3),
      productPrice: this.page.getByRole('row').nth(1).locator('td').nth(2),
      linePrice: this.page.getByRole('row').nth(1).locator('td').nth(3),
      quantityInput: this.page.getByRole('spinbutton', { name: /quantity/i }),
      toast: this.page.getByText(/updated/i),
      body: this.page.locator('body'),
    };
  }

  async waitForCheckoutPage() {
    await this.locators.cartTotal.waitFor();
  }

  async getUnitPrice(): Promise<number> {
    return cleanPrice(await this.locators.productPrice.innerText());
  }

  async getLinePrice(): Promise<number> {
    return cleanPrice(await this.locators.linePrice.innerText());
  }

  async getCartTotal(): Promise<number> {
    return cleanPrice(await this.locators.cartTotal.innerText());
  }

  async updateQuantity(quantity: number) {
    await this.locators.quantityInput.fill(String(quantity));
    await this.locators.body.click(); // unchanged as per your request
    await this.locators.toast.waitFor();
  }

  async validateTotalWithQuantity(quantity: number) {
    const unitPrice = await this.getUnitPrice();
    const expected = unitPrice * quantity;

    await expect.poll(() => this.getCartTotal())
      .toBe(expected);

    expect(await this.getLinePrice()).toBe(expected);
  }
}






















/*import { Page, expect } from '@playwright/test';
import { cleanPrice } from '../../utils/priceUtils';

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

  // get total line price
  async getLinePrice(): Promise<number> {
    const lineText = await this.page.locator('[data-test="line-price"]').innerText();
    return cleanPrice(lineText);
  }

  // get cart total
  async getCartTotal(): Promise<number> {
    const totalText = await this.page.locator('[data-test="cart-total"]').innerText();
    return cleanPrice(totalText);
  }

  // update quantity 
  async updateQuantity(quantity: number) {
    const qtyInput = this.page.locator('[data-test="product-quantity"]');

    await qtyInput.waitFor();
    await qtyInput.click();

    // clear + enter new value
    await qtyInput.fill(String(quantity));

    // trigger UI update
    await this.page.locator('body').click();   // To remove the focus from quanity field
    //await qtyInput.press('Enter');


    // WAIT for toaster
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
} */