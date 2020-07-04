import StarWarElements from './search-page.po';
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
}
