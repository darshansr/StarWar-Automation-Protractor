import StarWarMethods from '../page_object/search-page.methods';
const { Given, When, Then } = require('cucumber');
const chai = require('chai').use(require('chai-as-promised'));
const expect = chai.expect;
const assert = chai.assert;
const testData = require('../testdata.json');
const starWar: StarWarMethods = new StarWarMethods();
let resultFound = false;

Given(/^I navigate to "(.*?)"$/, { timeout: 90 * 1000 }, async (url: string) => {
    await starWar.gotoWebPage(url);
});

When(/^I select a type "(.*?)"$/, async (typeName: string) => {
    if (typeName.toLowerCase() !== 'planets') {
        assert.strictEqual(true, starWar.selectRadioButton(typeName), 'Fail to select people radio button');
    } else {
        assert.strictEqual(true, starWar.selectRadioButton(typeName), 'Fail to select planets radio button');
    }
});

When(/^I search for "(.*?)"$/, async (name: string) => {
    await starWar.userInput(name); // what type of assert i can right isOk()?
});

When(/^I click on "(.*?)" button/, async (buttonName: string) => {
    assert.strictEqual(true, starWar.buttonClick(buttonName), 'Fail to click Search button');
    await starWar.browserSleep(1500);
});

Then(/^Star war details are "(.*?)"$/, async (expected: string) => {
    if (expected === 'Found') {
        resultFound = true;
        await expect(await starWar.isResultFound(resultFound)).to.deep.equal(testData.name);
    } else {
        resultFound = false;
        await expect(await starWar.isResultFound(resultFound)).to.deep.equal('Not found.');
    }
});

Then(/^Verify person results/, async () => {
    if (resultFound === true) {
        (await starWar.verifyPersonResults()).forEach(async (result) => {
            await expect(testData[result.split(':')[0]]).to.equal(result.split(':')[1].trim(), 'not matched');
        });
    }
});
