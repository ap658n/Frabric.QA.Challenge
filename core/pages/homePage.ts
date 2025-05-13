import { BrowserContext, Page } from "@playwright/test";
import ActionsWrapper from "../wrapper/actions";

export default class HomePage {
    private actions: ActionsWrapper;

    constructor(public readonly page: Page, public readonly context: BrowserContext) {
        this.actions = new ActionsWrapper(page, context);
    }
    private elementsAttribute = {
        
    }
    async navigateToParaBankSite(baseURL) {
        console.log(`Navigate to Para Bank Site.`);
        await this.actions.goto(baseURL);
    }
    async verifyPageLogo(){
        console.log(`Verify Para Bank Logo.`);
        await this.actions.verifyPageLogo('ParaBank')
    }
    async verifyCustomerLogInHeading(){
        console.log(`Verify Customer Login.`);
        await this.actions.verifyPageHeader('Customer Login')
    }

    async navigateToRegistrationPage(){
        console.log(`Navigate to registration page.`);
        await this.actions.clickLinkTextByText('Register')
    }

    async userLogin(username: string, Password : string){
        console.log(`Proceed to user login.`);
        await this.actions.typeTextFieldValueByElementName('username',username)
        await this.actions.typeTextFieldValueByElementName('password',Password)
        await this.actions.clickButtonByLabel('Log In')
    }
    async navigateToHomePageFromNavHeader(){
        console.log(`Navigate to home page.`);
        await this.actions.clickLinkTextByText('home')
        await this.actions.verifyBodyText('ATM Services')
        await this.actions.verifyBodyText('Online Services')
    }
    async navigateToAboutPageFromNavHeader(){
        console.log(`Navigate to about page.`);
        await this.actions.clickLinkTextByText('about')
        await this.actions.verifyPageHeader('ParaSoft Demo Website')
    }
    async navigateToContactPageFromNavHeader(){
        console.log(`Navigate to contact page.`);
        await this.actions.clickLinkTextByText('contact')
        await this.actions.verifyPageHeader('Customer Care')
    }
    async navigateToAboutUsPageFromGlobalMenu(){
        console.log(`Navigate to about us page.`);
        await this.actions.clickLinkTextByText('About Us')
        await this.actions.verifyPageHeader('ParaSoft Demo Website')
    }
    async navigateToServicesPageFromGlobalMenu(){
        console.log(`Navigate to services page.`);
        await this.actions.clickLinkTextByText('Services')
        await this.actions.verifyBodyText('Available Bookstore SOAP services:')
    }
    async navigateToProductsPageFromGlobalMenu(){
        console.log(`Navigate to products page.`);
        await this.actions.clickLinkTextByText('Products')
        await this.actions.verifyPageHeader("Benefits of Parasoft's Automated Solutions")
        await this.actions.browserNavigateBack()
    }
    async navigateToLocationsPageFromGlobalMenu(){
        console.log(`Navigate to locations page.`);
        await this.actions.clickLinkTextByText('Locations')
        await this.actions.verifyPageHeader("Deliver High-Quality & Secure Software")
        await this.actions.browserNavigateBack()
    }
    async navigateToAdministrationPageFromGlobalMenu(){
        console.log(`Navigate to services page.`);
        await this.actions.clickLinkTextByText('Admin Page')
        await this.actions.verifyPageHeader('Administration')
    }
}