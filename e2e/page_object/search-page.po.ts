import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

export default class StarWarElements {
    public inputTextBox: ElementFinder;
    public peopleRadioButton: ElementFinder;
    public planetsRadioButton: ElementFinder;
    public searchButton: ElementFinder;
    public notFound: ElementFinder;
    public givenName: ElementFinder;
    public personResults: ElementArrayFinder;
    public planetsResults: ElementArrayFinder;
    public numberOfPersonResults: ElementArrayFinder;
    public numberOfPlanetsResults: ElementArrayFinder;


    constructor() {
        this.inputTextBox = element(by.id('query'));
        this.peopleRadioButton = element(by.id('people'));
        this.planetsRadioButton = element(by.id('planets'));
        this.searchButton = element(by.buttonText('Search'));
        this.notFound = element(by.xpath('//div[@id=\'searchNotFound\']'));
        this.givenName = element(by.xpath('//h6[@class=\'card-subtitle mb-2 text-muted\']'));
        this.personResults = element.all(by.xpath('//app-character[not(@id) or not(@class)]')).
            all(by.className('card-body')).all(by.className('row'));
        this.planetsResults = element.all(by.xpath('//app-planet[not(@id) or not(@class)]')).
            all(by.className('card-body')).all(by.className('row'));
        this.numberOfPersonResults = element.all(by.xpath('//app-character[not(@id) or not(@class)]'));
        this.numberOfPlanetsResults = element.all(by.xpath('//app-planet[not(@id) or not(@class)]'));
    }
}
