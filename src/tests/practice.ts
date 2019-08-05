import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

let path = require('path');
let scriptName = path.basename(__filename);

describe('File Name: ' + scriptName, async () => {
	
	let credentials: { oldItsUser: string, oldItsPassword: string, newItsUser: string, newItsPassword: string } = { oldItsUser: "", oldItsPassword: "", newItsUser: "", newItsPassword: "" };

	// beforeAll(async () => {
	// 	await authenticate.login(browser.params.env, browser.params.userName);
	// });

	describe('launching google', async () => {

		it('Click on the Heading of the Client Widget to Navigate to Full View', async () => {
			await browser.get("https:\\www.google.com");
			
		});

	});
});	