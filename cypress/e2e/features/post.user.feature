Feature: Admin creates books using POST API

  Background:
    Given User logged in as the User

  Scenario: User successfully create a book with valid title and author
    Given User have the following book details:
      | title                                             | author           |
      | Harry Potter and the Sorcerer’s Stone             | J.K. Rowling     |
    When User send a POST request to the create book endpoint
    Then User should receive a 201 status code
    And the response should contain the created book details

  Scenario: User successfully create a book with valid fields, including id
    Given User have the following book details:
      | id    | title       | author        |
      | 119   | Dracula     | Bram Stoker   |
    When User send a POST request to the create book endpoint
    Then User should receive a 201 status code
    And the response should contain the created book details, including id


  Scenario: User fails to create a book with an existing title
    Given User have the following book details:
      | title                                             | author           |
      | Harry Potter and the Sorcerer’s Stone             | J.K. Rowling     |
    When User send a POST request to the create book endpoint
    Then User should receive a 208 status code


  Scenario: User fails to create a book with title as an empty field
    Given User have the following book details:
      | id    | title                | author         |
      | 119   |                      | J.K. Rowling   |
    When User send a POST request to the create book endpoint
    Then User should receive a 401 status code

  Scenario: User fails to create a book with author as an empty field
    Given User have the following book details:
      | id  | title                         | author      |
      | 123 | The Chronicles of Narnia      |             |
    When User send a POST request to the create book endpoint
    Then User should receive a 401 status code

