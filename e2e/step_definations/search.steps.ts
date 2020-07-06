import StarWarMethods from '../page_object/search-page.methods';
const { Given, When, Then } = require('cucumber');
const chai = require('chai').use(require('chai-as-promised'));
const expect = chai.expect;
const assert = chai.assert;
const starWar: StarWarMethods = new StarWarMethods();

Given(/^I navigate to "(.*?)"$/, { timeout: 90 * 1000 }, async (url: string) => {
    await starWar.gotoWebPage(url);
});

When(/^I select a type "(.*?)"$/, async (typeName: string) => {
    if (typeName.toLowerCase() !== 'planets') {
        assert.strictEqual(true, starWar.selectRadioButton(typeName), 'Fail to select people radio button');
        await starWar.browserSleep(1500);
    } else {
        assert.strictEqual(true, starWar.selectRadioButton(typeName), 'Fail to select planets radio button');
        await starWar.browserSleep(1500);
    }
});

When(/^I search for a "(.*?)"$/, async (name: string) => {
    await starWar.userInput(name); // what type of assert i can right isOk()?
});

When(/^I click on "(.*?)" button/, async (buttonName: string) => {
    assert.strictEqual(true, starWar.buttonClick(buttonName), 'Fail to click Search button');
    await starWar.browserSleep(1500);
});

Then(/^Star Wars details are "(.*?)" for "(.*?)"$/, async (expected: string, name: string) => {
    if (expected === 'Found') {
        await expect(await starWar.isResultFound(true)).to.include(starWar.checkNamePresentInTD(name)[0]);
    } else {
        await expect(await starWar.isResultFound(false)).to.deep.equal('Not found.');
    }
});

Then(/^Verify person "(.*?)" results/, async (name: string) => {
    const resultLength = await starWar.numberOfPersonResults();
    if (resultLength.length === 0) {
        await assert.equal(resultLength.length, 0, 'Not Found');
    } else if (resultLength.length === 1) {
        const testData = starWar.checkNamePresentInTD(name)[1];
        (await starWar.verifyPersonResults()).forEach(async (result) => {
            await expect(testData[result.split(':')[0]]).to.equal(result.split(':')[1].trim(), 'Fail to match in data');
        });
    } else {
        await assert.isAbove(resultLength.length, 1, 'Partial Match');
    }
});

Then(/^Verify planet "(.*?)" results/, async (name: string) => {
    const resultLength = await starWar.numberOfPlanetsResults();
    if (resultLength.length === 0) {
        await assert.equal(resultLength.length, 0, 'Not Found');
    } else if (resultLength.length === 1) {
        const testData = starWar.checkNamePresentInTD(name)[1];
        (await starWar.verifyPlantesResults()).forEach(async (result) => {
            await expect(testData[result.split(':')[0]]).to.equal(result.split(':')[1].trim(), 'Fail to match in data');
        });
    } else {
        await assert.isAbove(resultLength.length, 1, 'Partial Match');
    }
});

When(/^I clear form "(.*?)"$/, async (name: string) => {
    await starWar.userInput(name);
    await starWar.browserSleep(1500);
});

When(/^I press enter key/, async () => {
    await starWar.pressEnter();
    await starWar.browserSleep(1500);
});

Then(/^there are more than one results listed$/, async () => {
    await assert.isAbove((await starWar.numberOfPlanetsResults()).length, 1, 'Partial Match');
});
