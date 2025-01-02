Feature: Admin creates books using POST API

  Background:
    Given User logged in as an admin


    Scenario: Admin successfully create a book with valid title and author
      Given Admin have the following book details:
        | title                  | author           |
        | The Hobbit             | J.R.R. Tolkien   |
      When Admin send a POST request to the create book endpoint
      Then Admin should receive a 201 status code
      And the response should contain the created book details

    Scenario: Admin successfully create a book with valid fields, including id
      Given Admin have the following book details:
        | id    | title                      | author               |
        | 109   | A Song of Ice and Fire     | George R.R. Martin   |
      When Admin send a POST request to the create book endpoint
      Then Admin should receive a 201 status code
      And the response should contain the created book details, including id


    Scenario: Admin fails to create a book without title
      Given Admin have the following book details:
        | id  | author |
        | 123 |        |
      When Admin send a POST request to the create book endpoint
      Then Admin should receive a 401 status code

    Scenario: Admin fails to create a book without author
      Given Admin have the following book details:
        | id  | title |
        | 123 |       |
      When Admin send a POST request to the create book endpoint
      Then Admin should receive a 401 status code
