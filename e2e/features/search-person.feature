Feature: Search for a Star Wars character

    Scenario Outline: Search for character (person)
        Given I navigate to "localhost"
        And  I select a type "person"
        And  I search for "<person>"
        When I click on "Search" button
        Then Star war details are Validated "<valid>"

        Examples:
            | person         | valid |
            | Luke Skywalker | true  |
            | darshan        | false |
