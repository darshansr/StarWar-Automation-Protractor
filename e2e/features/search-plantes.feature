Feature: Search for a Star Wars planets

    Scenario Outline: Search for planets
        Given I navigate to "localhost"
        And  I select a type "planets"
        And  I search for "<planets name>"
        When I click on "Search" button
        Then Star war details are "<expected>" "<planets name>"
        And Verify planets "<planets name>" results

        Examples:
            | planets name | expected  |
            | Alderaan     | Found     |
            | an           | Found     |
            | darshan      | Not found |
