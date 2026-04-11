import { Page, Locator } from '@playwright/test';

export class LoginPage {
  private page: Page;

  private locators: {
    signInLink: Locator;
    email: Locator;
    password: Locator;
    loginBtn: Locator;
    navMenu: Locator;
    errorMsg: Locator;
  };

  constructor(page: Page) {
    this.page = page;

    this.locators = {
      signInLink: this.page.getByRole('link', { name: 'Sign in' }),
      email: this.page.locator('[data-test="email"]'),
      password: this.page.locator('[data-test="password"]'),
      loginBtn: this.page.getByRole('button', { name: 'Login' }),
      navMenu: this.page.locator('[data-test="nav-menu"]'),
      errorMsg: this.page.getByText('Invalid'),
    };
  }

  async goToLogin() {
    await this.locators.signInLink.click();
  }

  async login(email: string, password: string) {
    await this.locators.email.fill(email);
    await this.locators.password.fill(password);
    await this.locators.loginBtn.click();
  }

  async waitForLoginSuccess() {
    await this.locators.navMenu.waitFor();
  }

  async getLoginError() {
    return this.locators.errorMsg;
  }
}


/*import { Page, expect } from '@playwright/test';

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
} */