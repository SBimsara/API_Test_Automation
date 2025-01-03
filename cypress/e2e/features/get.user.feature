Feature: Get All Books API Testing for User

  Background: 
    Given User is logged in with the username "user" and password "password"

  Scenario: Successfully get all books with user credentials
    When User requests to get all books
    Then the response status code should be exactly 200
    And the response should contain a list of books

  Scenario: Successfully get a specific book with user credentials
    Given the book ID is 1
    When User requests to get the book
    Then the response status code should be correctly 200
    And the response should contain the book details
