Feature: Search for a Star Wars character

    Scenario Outline: Search for character (person)
        Given I navigate to "localhost"
        And  I select a type "person"
        And  I search for "<persons name>"
        When I click on "Search" button
        Then Star war details are "<expected>"
        And  Verify person results

        Examples:
            | persons name   | expected  |
            | Luke Skywalker | Found     |
            | darshan        | Not found |
