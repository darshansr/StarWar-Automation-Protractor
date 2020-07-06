Feature: Search for a Star Wars characters

    Scenario Outline: Search for a character (person)
        Given I navigate to "localhost"
        And  I select a type "person"
        And  I search for a "<person name>"
        When I click on "Search" button
        Then Star Wars details are "<expected>" for "<person name>"
        And  Verify person "<person name>" results

        Examples:
            | person name    | expected  |
            | Luke Skywalker | Found     |
            | darshan        | Not found |
