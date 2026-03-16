import { Page, expect } from '@playwright/test';
import { NavigationPage } from '../page-objects/navigationPage';
import { FormLayoutsPage } from '../page-objects/formLayoutsPage';
import { FormPage } from '../page-objects/formPage';

export class PageManager {
    private readonly page: Page
    private readonly navigationPage: NavigationPage
    private readonly formLayoutsPage: FormLayoutsPage
    private readonly formPage: FormPage
        // readonly locator: Locator
    constructor(page: Page){
            this.page = page
            this.navigationPage = new NavigationPage(this.page)
            this.formLayoutsPage = new FormLayoutsPage(this.page)
            this.formPage = new FormPage(this.page)
        }
    navigateTo(){
        return this.navigationPage
    }
    toFormLayoutsPage(){
        return this.formLayoutsPage
    }
    toFormPage(){
        return this.formPage
    }
}