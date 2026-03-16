import { Locator, Page } from '@playwright/test';
import { HelperBase } from './helperBase';

export class FormLayoutsPage extends HelperBase {
    // private readonly page: Page
    // readonly locator: Locator
    constructor(page: Page){

        super(page)
    }
    async submitGridFormUsingCredentialsAndSelectOption(email: string, password: string, optionText: string){
        const usingGridForm = await this.page.locator('nb-card', {hasText : "Using the Grid"})
        await usingGridForm.getByRole('textbox', {name: "email"}).fill(email)
        await usingGridForm.getByRole('textbox', {name: "password"}).fill(password)
        await usingGridForm.getByRole('radio', {name: optionText}).check({force: true})

    }
}