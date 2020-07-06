Feature: Search for a Star Wars planets

    Scenario Outline: Search for a planet
        Given I navigate to "localhost"
        And  I select a type "planets"
        And  I search for a "<planet name>"
        When I click on "Search" button
        Then Star Wars details are "<expected>" for "<planet name>"
        And Verify planet "<planet name>" results

        Examples:
            | planet name | expected  |
            | Alderaan    | Found     |
            | darshan     | Not found |
