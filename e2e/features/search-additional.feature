Feature: Search for a Star Wars Automation Additional Scenarios

    Scenario: Search for either a person or a planet, clear form and search
        Given I navigate to "localhost"
        And  I select a type "person"
        And I search for a "Luke Skywalker"
        When I click on "Search" button
        Then Star Wars details are "Found" for "Luke Skywalker"
        When I clear form ""
        And I click on "Search" button
        Then Star Wars details are "Not found" for ""

    Scenario: Search for a person and press ENTER Key
        Given I navigate to "localhost"
        And  I select a type "person"
        And I search for a "Luke Skywalker"
        When I press enter key
        Then Star Wars details are "Found" for "Luke Skywalker"

    Scenario: Search full person name, switch to a planet and search same full name
        Given I navigate to "localhost"
        And  I select a type "person"
        And I search for a "Luke Skywalker"
        When I click on "Search" button
        Then Star Wars details are "Found" for "Luke Skywalker"
        When I select a type "planets"
        And I click on "Search" button
        Then Star Wars details are "Not found" for ""

    Scenario: Search full planet name, switch to a person and search same full name
        Given I navigate to "localhost"
        And  I select a type "planets"
        And I search for a "Alderaan"
        When I click on "Search" button
        Then Star Wars details are "Found" for "Alderaan"
        When I select a type "person"
        And I click on "Search" button
        Then Star Wars details are "Not found" for ""

    Scenario: Search for a partial planets matching
        Given I navigate to "localhost"
        And  I select a type "planets"
        And I search for a "an"
        When I click on "Search" button
        Then Star Wars details are "Found" for "an"
        And there are more than one results listed
