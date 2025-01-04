Feature: Admin updates books using PUT API

    Background:
        Given User logged in as user

    Scenario: User fails to update a book with valid details
        Given Admin has the following book details for update:
            | id   | title             | author           |
            | 3    | Lord of the Rings | J.R.R. Tolkien   |
        When Admin sends a PUT request to the update book endpoint
        Then Admin should receive 401 status code