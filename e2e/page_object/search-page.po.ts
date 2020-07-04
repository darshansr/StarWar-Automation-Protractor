import { element, by, ElementFinder } from 'protractor';

export default class StarWarElements {
    public inputTextBox: ElementFinder;
    public peopleRadioButton: ElementFinder;
    public planetsRadioButton: ElementFinder;
    public searchButton: ElementFinder;
    public notFound: ElementFinder;
    public givenName: ElementFinder;

    constructor() {
        this.inputTextBox = element(by.id('query'));
        this.peopleRadioButton = element(by.id('people'));
        this.planetsRadioButton = element(by.id('planets'));
        this.searchButton = element(by.buttonText('Search'));
        this.notFound = element(by.xpath('//div[@id=\'searchNotFound\']'));
        this.givenName = element(by.xpath('//h6[@class=\'card-subtitle mb-2 text-muted\']'));
    }
}
