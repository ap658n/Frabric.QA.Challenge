import { BrowserContext, Page } from "@playwright/test";
import ActionsWrapper from "../wrapper/actions";
import { data } from "../helper/propertyData";

export default class RegisterUserPage {
    
    private actions: ActionsWrapper;

    constructor(public readonly page: Page, public readonly context: BrowserContext) { 
        this.actions = new ActionsWrapper(page, context);
    }
    private elementsAttribute = {

    }

    async validateUserRegistrationPage(){
        console.log(`Verify User Registration.`);
        await this.actions.verifyPageHeader('Signing up is easy!')
        
    }
    async enterFirstName(value: string){
        console.log(`User enter first name ${value}.`);
        await this.actions.typeTextFieldValueByElementName('customer.firstName',value)
    }
    
    async enterLastName(value: string){
        console.log(`User enter last name ${value}.`);
        await this.actions.typeTextFieldValueByElementName('customer.lastName',value)
    }
    async enterAddress(value: string){
        console.log(`User enter address ${value}.`);
        await this.actions.typeTextFieldValueByElementName('customer.address.street',value)
    }

    async enterCity(value: string){
        console.log(`User enter city ${value}.`);
        await this.actions.typeTextFieldValueByElementName('customer.address.city',value)
    }
    async enterState(value: string){
        console.log(`User enter state ${value}.`);
        await this.actions.typeTextFieldValueByElementName('customer.address.state',value)
    }
    async enterZipCode(value: string){
        console.log(`User enter zipCode ${value}.`);
        await this.actions.typeTextFieldValueByElementName('customer.address.zipCode',value)
    }
    async enterPhoneNumber(value: string){
        console.log(`User enter phoneNumber ${value}.`);
        await this.actions.typeTextFieldValueByElementName('customer.phoneNumber',value)
    }
    async enterSSN(value: string){
        console.log(`User enter ssn ${value}.`);
        await this.actions.typeTextFieldValueByElementName('customer.ssn',value)
    }
    async enterUsername(value: string){
        console.log(`User enter username ${value}`);
        await this.actions.typeTextFieldValueByElementName('customer.username',value)
        data.setProperty('created_username', value);
    }
    async enterPassword(value: string){
        console.log(`User enter password ${value}`);
        await this.actions.typeTextFieldValueByElementName('customer.password',value)
        data.setProperty('created_password', value);
    }
    async enterConfirmPassword(value: string){
        console.log(`User enter confirm password ${value}`);
        await this.actions.typeTextFieldValueByElementName('repeatedPassword',value)
    }
    async clickRegister(){
        console.log(`User proceed to registration.`);
        await this.actions.clickButtonByLabel('Register')
    }
}