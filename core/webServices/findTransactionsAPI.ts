import { request, expect } from "@playwright/test";
import { data } from "../helper/propertyData";
import { assert } from "console";

export default class FindTransactionsAPI {
    async getFindTransactions(accountID: string, amount: string) {
        console.log(`--------------------Find Transactions for Account ${accountID}--------------------------`);
        const apiContext = await request.newContext({ baseURL: 'https://parabank.parasoft.com', httpCredentials: { username: data.getProperty('created_username'), password: data.getProperty('created_password') } });
        const response = await apiContext.get(`/parabank/services_proxy/bank/accounts/${accountID}/transactions/amount/${amount}`)
        expect(response.ok).toBeTruthy();
        expect(response.status()).toEqual(200);
        console.log('-----------------response payload------------------------')
        console.log(await response.json())
        return await response.json();
    }
    async getAndVerifyTransactions(accountID: string, amount:string){
        console.log(`User verify account ${accountID} transactions with amount ${amount}.`);
        const response = await this.getFindTransactions(accountID,amount);
        expect(String(response[0].amount), 'Amount not match.').toEqual(amount)
        expect(String(response[0].accountId), 'Amount not match.').toMatch(accountID)
    }

}