Feature: Delete a book using the API
  As a user or admin
  I want to test the API's behavior when deleting a book
  So that I can verify role-based access and functionality

  Background:
    Given the API endpoint is "/api/books/{int}"

  Scenario: Admin attempts to delete a book
    Given User is authenticated as an "Admin"
    When A "Admin" tries to delete a book with id 1
    Then The API should return a 200 status code for the "Admin"

  Scenario: Regular user attempts deletes a book
    Given User is authenticated as an "User"
    When A "User" tries to delete a book with id 1
    Then The API should return a 403 status code for the "User"

  Scenario: Regular user behavior is undocumented but functional
    Given User is authenticated as an "User"
    When A "User" tries to delete a book with id 2
    Then The API should return a 200 status code for the "User"
    And The functionality should be reported as an undocumented feature


  Scenario: User trying to delete non existing record, undocumented but functional
    Given User is authenticated as an "User"
    When A "User" tries to delete a book with id 2
    Then The API should return a 404 status code for the "User"
    And The response body should indicate "Book not found"



