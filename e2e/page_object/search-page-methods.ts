import SearchPageElements from './search-page-elements';
import { browser, protractor } from 'protractor';
const searchPage: SearchPageElements = new SearchPageElements();
const testData = require('../testdata.json');

export default class SearchPageMethods {
    /**
     *  Select Radio Button matches the params, return true if selected
     * @param selectType Radio button to select.
     */
    public selectRadioButton(selectType: string) {
        switch (selectType) {
            case 'person': searchPage.peopleRadioButton.click();
                return true;
            case 'planets': searchPage.planetsRadioButton.click();
                return true;
            default: return false;
        }
    }

     /**
     * User Input value is send to selected box
     * @param text Enter the input value
     */
    public userInput(text: string) {
        if (text === '') {
            return searchPage.inputTextBox.clear();
        } else {
            return searchPage.inputTextBox.sendKeys(text);
        }
    }

    // TODO: Document can be written based on above rules.
    // and also most of the method names implicitly defines the functionality
    public buttonClick(buttonName: string) {
        switch (buttonName) {
            case 'Search': searchPage.searchButton.click();
                return true;
            default: return false;
        }
    }

    public async isResultFound(valid: boolean) {
        if (valid) {
            return await searchPage.givenName.getText();
        } else {
            return await searchPage.notFound.getText();
        }
    }

    public async verifyPersonResults() {
        return await this.getsearchPageResults(await searchPage.personResults);
    }

    public async verifyPlantesResults() {
        return await this.getsearchPageResults(await searchPage.planetsResults);
    }

    public async numberOfPersonResults() {
        return await searchPage.numberOfPersonResults;
    }

    public async numberOfPlanetsResults() {
        return await searchPage.numberOfPlanetsResults;
    }

    private async getsearchPageResults(results: any) {
        const finalResult = [];
        for (let index = 0; index < results.length; index++) {
            const value = await results[index].getText();
            finalResult.push(value);
        }
        return finalResult;
    }

    public checkNamePresentInTD(nameProp: string) {
        let name: string, obj: any;
        testData.forEach((data) => {
            if (data.hasOwnProperty(nameProp)) {
                [name, obj] = [nameProp, data[nameProp]];
            }
        });
        return [name, obj];
    }

    public gotoWebPage(url: string) {
        return browser.get('http://' + url + ':4200/');
    }

    public browserSleep(ms: number) {
        return browser.sleep(ms);
    }

    public pressEnter() {
        return browser.actions().sendKeys(protractor.Key.ENTER).perform();
    }
}
