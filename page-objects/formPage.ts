import { Locator, Page } from '@playwright/test';
import { HelperBase } from './helperBase';

export class FormPage extends HelperBase {
    // private readonly page: Page
    // readonly locator: Locator
    constructor(page: Page){
        super(page)
    }
    async submitFormWithDifferentOptions(firstName: string, lastName: string, email: string, mobileNumber: string, gender: string){
        await this.enterText('#firstName', firstName);
        await this.enterText(this.page.getByRole('textbox', {name: "Last Name"}), lastName)
        await this.enterText('#userEmail', email);
        await this.enterText('#userNumber', mobileNumber);
        await this.selectRadioButton(this.page.getByText('Male', { exact: true }))
        await this.page.waitForTimeout(5000)
    }
}