const reporter = require('cucumber-html-reporter');
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const jsonReports = path.join(process.cwd(), '/test_reports');
const htmlReports = path.join(process.cwd(), '/test_reports');

// TODO: Congifure to protractor file will get the test results in HTML format.
const options = {
    theme: 'bootstrap',
    jsonFile: jsonReports + '/cucumber-test-results.json',
    output: htmlReports + '/cucumber-test-results.html',
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: true,
    metadata: {
        'Platform': 'Windows 10',
        'Parallel': 'Scenarios',
        'Executed': 'Remote'
    }
};

export default class Reporter {
     createDirectory(dir) {
        if (!fs.existsSync(dir)) {
            mkdirp.sync(dir);
        }
    }
     createHTMLReport() {
        try {
            reporter.generate(options); // invoke cucumber-html-reporter
        } catch (err) {
            if (err) {
                throw new Error('Failed to save cucumber test results to json file.');
            }
        }
    }
}
