# QA Engineer Assessment Solution

## Introduction

Use this file to document your solution and findings.

## Project Setup and Running e2e Test refer README.md file

## Protractor | Cucumber | Typescript | Chai | e2e | BDD | Assert

Protractor is an end-to-end test framework for Angular and AngularJS applications. Protractor runs tests against your application running in a real browser, interacting with it as a user would with the help of different frameworks like Jasmine, cucumber, mocha, chai etc which flows BDD/ TDD methodologies.

### Skeleton of e2e Automation Test Cases

    .
    ├── e2e                     # end to end Automated tests files 
    ├── src                     # Client Source files 
    ├── tsconfig.json           # Typescript Compiler options  
    ├── Package.json            # node modules and dev utilities
    ├── angular.json            # Build and serve application
    └── README.md

### e2e Testing 


    ├── ...
    ├── e2e                   # Spec files 
    │   ├── features         # Contains given scenarios in different feature files
    │   ├── helper           # supporting files like report,Hooks screenshot
    │   ├── page_object      # contains POM Finder and its methods to handle logic
    │   ├── step_definitions # Defining Given, when and then
    │   ├── test_reports     # cucumber_test_report in html and json formate   
    │   ├── protractor.conf  # webdriver, cucumber, browser utilites, report etc.
    │   ├── testData.json    # test data contains actual data to compare expected one 
    │   └── tsconfig.e2e.json # typescript configuration
    └── ...

#### Features Files,

Created 3 Features files based on the given Business requirement.

```
Feature: Search for a Star Wars characters,
Feature: Search for a Star Wars planets,
Feature: Search for a Star Wars Automation Additional Scenarios,

```

#### Step Definitions,

Used Cucumber to write test cases which is called as feature files. 
Feature file is written in simple english flow Gherkin syntax.

Used Chai  BDD / TDD assertion library for node and the browser that can be delightfully paired with any javascript testing framework.

"assert" style is used through actual and expected result validation. 

Example File,
```
import SearchPageMethods from '../page_object/search-page-methods';
const { Given, When, Then } = require('cucumber');
const chai = require('chai').use(require('chai-as-promised'));
const assert = chai.assert;
const serachPage: SearchPageMethods = new SearchPageMethods();

Given(/^I navigate to "(.*?)"$/, { timeout: 90 * 1000 }, async (url: string) => {
    await serachPage.gotoWebPage(url);
});

```

## Page Objects

Design pattern, popularly used in test automation that creates Object Repository for web UI elements.The advantage of the model is that it reduces code duplication and improves test maintenance.

Under this model, for each web page in the application, there should be a corresponding Page Class. 
This Page class will identify the WebElements of that web page and also contains Page methods which perform operations on those WebElements.

```
import { $ } from "protractor";

export class SearchPageObject {
    public inputTextBox: ElementFinder;
    public peopleRadioButton: ElementFinder;
    public planetsRadioButton: ElementFinder;
    public searchButton: ElementFinder;
    public notFound: ElementFinder;

    constructor() {
         this.inputTextBox = element(by.id('query'));
        this.peopleRadioButton = element(by.id('people'));
        this.planetsRadioButton = element(by.id('planets'));
    }
}

```

### cucumber Hooks

BeforeAll, After, AfterAll, Status 

Above Hooks can be used based on the required senarios launching webpage, taking screenshot,quit the browser etc.

### Report In html using cucumber-html-reporter node module

We can have great report for compelete over view of the feature, scenarios, pass and fail , assertion stack trace.

Note: Integrated report having complier error during importing of ts file in generating HTML report.

Alternatively Used Json file to capturing Test result.


### Test Report

3 Feature      
9 Scenarios   (1 failed, 8 passed),
59 Steps      (1 failed, 58 passed),         

Time took in between 50sec to 1minutes

### Bugs or anomalies

````
Scenario: Search for either a person or a planet, clear form and search

Above Scenario gets failed when clear the “Search form” full name and press enter/button.

Solution: After clearing the inputText box data, Validate the Input based on the empty string by notifying some messages "please enter the person or plantes value".
````

Anomalies

Some of the tag elements Neither id nor classes are defined.


### Name and optionally contact information

Darshan S R
darshansr.niit@gmail.com

Please contact me if you need an help in running this assignement,

## Remarks 

...
