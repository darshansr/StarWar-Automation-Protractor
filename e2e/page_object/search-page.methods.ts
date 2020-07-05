import StarWarElements from './search-page.po';
import { browser } from 'protractor';
const starWar: StarWarElements = new StarWarElements();

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
        return starWar.inputTextBox.sendKeys(text);
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
        const results = await starWar.personResults;
        const finalResult = [];
        for (let index = 0; index < results.length; index++) {
            const value = await results[index].getText();
            finalResult.push(value);
        }
        return finalResult;
    }

    gotoWebPage(url: string) {
        return browser.get('http://' + url + ':4200/');
    }

    browserSleep(ms: number) {
        return browser.sleep(ms);
    }
}
