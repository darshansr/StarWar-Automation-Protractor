import StarWarMethods from '../page_object/search-page.methods';
const { Given, When, Then } = require('cucumber');
const { browser } = require('protractor');
const chai = require('chai').use(require('chai-as-promised'));
const expect = chai.expect;
const testData = require('../testdata.json');
const starWar: StarWarMethods = new StarWarMethods();

Given(/^I navigate to "(.*?)"$/, { timeout: 90 * 1000 }, async (text: string) => {
    await browser.get('http://' + text + ':4200/');
});

When(/^I select a type "(.*?)"$/, async (typeName: string) => {
    if (typeName.toLowerCase() !== 'planets') {
        starWar.selectRadioButton(typeName);
    } else {
        starWar.selectRadioButton(typeName);
    }
});

When(/^I search for "(.*?)"$/, async (personName: string) => {
    await starWar.userInput(personName);
});

When(/^I click on "(.*?)" button/, async (buttonName: string) => {
    starWar.buttonClick(buttonName);
    await browser.sleep(1500);
});

Then(/^Star war details are Validated "(.*?)"$/, async (expected: string) => {
    const isValid = expected === 'true';
    if (isValid) {
        await expect(await starWar.isResultFound(isValid)).to.deep.equal(testData.name);
    } else {
        await expect(await starWar.isResultFound(isValid)).to.deep.equal('Not found.');
    }
});
