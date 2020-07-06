import SearchPageMethods from '../page_object/search-page-methods';
const { Given, When, Then } = require('cucumber');
const chai = require('chai').use(require('chai-as-promised'));
const assert = chai.assert;
const searchPage: SearchPageMethods = new SearchPageMethods();

Given(/^I navigate to "(.*?)"$/, { timeout: 90 * 1000 }, async (url: string) => {
    await searchPage.gotoWebPage(url);
});

When(/^I select a type "(.*?)"$/, async (typeName: string) => {
    if (typeName.toLowerCase() !== 'planets') {
        assert.strictEqual(true, searchPage.selectRadioButton(typeName), 'Fail to select people radio button');
        await searchPage.browserSleep(1500);
    } else {
        assert.strictEqual(true, searchPage.selectRadioButton(typeName), 'Fail to select planets radio button');
        await searchPage.browserSleep(1500);
    }
});

When(/^I search for a "(.*?)"$/, async (name: string) => {
    await searchPage.userInput(name); // what type of assert i can right isOk()?
});

When(/^I click on "(.*?)" button/, async (buttonName: string) => {
    assert.strictEqual(true, searchPage.buttonClick(buttonName), 'Fail to click Search button');
    await searchPage.browserSleep(1500);
});

Then(/^Star Wars details are "(.*?)" for "(.*?)"$/, async (expected: string, name: string) => {
    if (expected === 'Found') {
        await assert.include(await searchPage.isResultFound(true), searchPage.checkNamePresentInTD(name)[0], 'Expected name is validate ');
    } else {
        await assert.strictEqual(await searchPage.isResultFound(false), 'Not found.', 'Result not found');
    }
});

Then(/^Verify person "(.*?)" results/, async (name: string) => {
    const resultLength = await searchPage.numberOfPersonResults();
    if (resultLength.length === 0) {
        await assert.equal(resultLength.length, 0, 'Not Found');
    } else if (resultLength.length === 1) {
        const testData = searchPage.checkNamePresentInTD(name)[1];
        (await searchPage.verifyPersonResults()).forEach(async (result) => {
            await assert.strictEqual(testData[result.split(':')[0]], result.split(':')[1].trim(), 'Fail to match data');
        });
    } else {
        await assert.isAbove(resultLength.length, 1, 'Partial Match');
    }
});

Then(/^Verify planet "(.*?)" results/, async (name: string) => {
    const resultLength = await searchPage.numberOfPlanetsResults();
    if (resultLength.length === 0) {
        await assert.equal(resultLength.length, 0, 'Not Found');
    } else if (resultLength.length === 1) {
        const testData = searchPage.checkNamePresentInTD(name)[1];
        (await searchPage.verifyPlantesResults()).forEach(async (result) => {
            await assert.strictEqual(testData[result.split(':')[0]], result.split(':')[1].trim(), 'Fail to match data');
        });
    } else {
        await assert.isAbove(resultLength.length, 1, 'Partial Match');
    }
});

When(/^I clear form "(.*?)"$/, async (name: string) => {
    await searchPage.userInput(name);
    await searchPage.browserSleep(1500);
});

When(/^I press enter key/, async () => {
    await searchPage.pressEnter();
    await searchPage.browserSleep(1500);
});

Then(/^there are more than one results listed$/, async () => {
    await assert.isAbove((await searchPage.numberOfPlanetsResults()).length, 1, 'Partial Match');
});
