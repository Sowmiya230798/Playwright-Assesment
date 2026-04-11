import { Page, expect } from '@playwright/test';

export class LoginPage { 
  constructor(private page: Page) {}

  async goToLogin() {
    await this.page.getByRole('link', { name: 'Sign in' }).click();
  }

  async login(email: string, password: string) {
    await this.page.locator('[data-test="email"]').fill(email);
    await this.page.locator('[data-test="password"]').fill(password);

    await this.page.getByRole('button', { name: 'Login' }).click();
  }
  //login success validation
    async menubar(){
    await this.page.locator('[data-test="nav-menu"]').waitFor();
  }
 //Login Fails
  async getLoginError() {
    return this.page.getByText('Invalid');
  }
}