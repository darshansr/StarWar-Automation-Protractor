import StarWarElements from './search-page.po';
import { browser, protractor } from 'protractor';
const starWar: StarWarElements = new StarWarElements();
const testData = require('../testdata.json');

export default class StarWarMethods {
    selectRadioButton(selectType: string) {
        switch (selectType) {
            case 'person': starWar.peopleRadioButton.click();
                return true;
            case 'planets': starWar.planetsRadioButton.click();
                return true;
            default: return false;
        }
    }

    userInput(text: string) {
        if (text === '') {
            return starWar.inputTextBox.clear();
        } else {
            return starWar.inputTextBox.sendKeys(text);
        }
    }

    buttonClick(buttonName: string) {
        switch (buttonName) {
            case 'Search': starWar.searchButton.click();
                return true;
            default: return false;
        }
    }

    async isResultFound(valid: boolean) {
        if (valid) {
            return await starWar.givenName.getText();
        } else {
            return await starWar.notFound.getText();
        }
    }

    async verifyPersonResults() {
        return await this.getStarWarResults(await starWar.personResults);
    }

    async verifyPlantesResults() {
        return await this.getStarWarResults(await starWar.planetsResults);
    }

    async numberOfPersonResults() {
        return await starWar.numberOfPersonResults;
    }

    async numberOfPlanetsResults() {
        return await starWar.numberOfPlanetsResults;
    }

    async getStarWarResults(results: any) {
        const finalResult = [];
        for (let index = 0; index < results.length; index++) {
            const value = await results[index].getText();
            finalResult.push(value);
        }
        return finalResult;
    }

    checkNamePresentInTD(nameProp: string) {
        let name: string, obj: any;
        testData.forEach((data) => {
            if (data.hasOwnProperty(nameProp)) {
                [name, obj] = [nameProp, data[nameProp]];
            }
        });
        return [name, obj];
    }

    gotoWebPage(url: string) {
        return browser.get('http://' + url + ':4200/');
    }

    browserSleep(ms: number) {
        return browser.sleep(ms);
    }

    pressEnter() {
        return browser.actions().sendKeys(protractor.Key.ENTER).perform();
    }
}
