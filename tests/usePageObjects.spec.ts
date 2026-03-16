import { test, expect } from '@playwright/test';
import { NavigationPage } from '../page-objects/navigationPage';
import { FormLayoutsPage } from '../page-objects/formLayoutsPage';
import { PageManager } from '../page-objects/pageManager';    
import {faker} from '@faker-js/faker'
import { randomFillSync } from 'crypto';
import { FormPage } from '../page-objects/formPage';
import { Console } from 'console';

test.beforeEach (async ({ page }) => {
  // await page.goto('http://localhost:4200/');
  await page.goto('https://demoqa.com/');
  

});

test.skip('navigate to form page', async ({ page }) => {
  const pm = new PageManager(page)
  await pm.navigateTo().formLayoutsPage()
  await pm.navigateTo().datePickerPage()
    // navigateTo.datePickerPage()
  
  
//   await page.close();
//   await browser.close();

});

test.skip('parameterized methods', async ({ page }) => {
  const pm = new PageManager(page)
  const fullName = faker.person.fullName()
  const name = faker.person.firstName()
  // const email = faker.internet.email()
  const randomEmail = `${fullName.replace(' ','')}${faker.number.int(1000)}@localhost.com`
  const password = faker.internet.password()

  await pm.navigateTo().formLayoutsPage()
  await pm.toFormLayoutsPage().submitGridFormUsingCredentialsAndSelectOption(randomEmail, password, "Option 1")
  });


  

test('fill the form', async ({ page }) => {
  const pm = new PageManager(page)
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  // const address = faker.location.streetAddress()
  const number = faker.phone.number()
  const randomEmail = `${firstName}${lastName}${faker.number.int(1000)}@localhost.com`
  // const password = faker.internet.password()
  console.info('First name is:'+firstName);
  await pm.navigateTo().formPage()
  await pm.toFormPage().submitFormWithDifferentOptions(firstName, lastName, randomEmail, number, "Male")
  });