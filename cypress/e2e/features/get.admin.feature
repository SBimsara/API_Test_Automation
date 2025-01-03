Feature: Get All Books API Testing

  Background:
    Given Admin is logged in with the username "admin" and password "password"

  Scenario: Successfully get all books with admin credentials
    When Admin requests to get all books
    Then the response status code should be exactly 200
    And the response should contain a list of books

  Scenario: Successfully get a specific book with admin credentials
    And the book ID is 1
    When Admin requests to get the book
    Then the response status code should be correctly 200
    And the response should contain the book details

  




