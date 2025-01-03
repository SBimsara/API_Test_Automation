Feature: Admin updates books using PUT API

    Background:
        Given User logged in as admin

    Scenario: Admin successfully updates a book with valid details
        Given Admin has the following book details for update:
            | id   | title            | author           |
            | 1    | The Silmarillion | J.R.R. Tolkien   |
        When Admin sends a PUT request to the update book endpoint
        Then Admin should receive 200 status code
        And the response should contain the updated book details

    Scenario: Admin fails to update a book with a missing title
        Given Admin has the following book details for update:
            | id   | author           |
            | 1    | J.R.R. Tolkien   |
        When Admin sends a PUT request to the update book endpoint
        Then Admin should receive 400 status code  

    Scenario: Admin fails to update a book with a missing author
        Given Admin has the following book details for update:
            | id   | title            |            
            | 1    | Non-existent     |                  
        When Admin sends a PUT request to the update book endpoint
        Then Admin should receive 400 status code     

    Scenario: Admin fails to update a book with a missing id
        Given Admin has the following book details for update:
            | title            | author           |
            | The Silmarillion | J.R.R. Tolkien   |                
        When Admin sends a PUT request to the update book endpoint
        Then Admin should receive 400 status code     

    Scenario: Admin fails to update a non-existent book
        Given Admin has the following book details for update:
            | id   | title            | author           |
            | 999  | The Hobbit       | J.R.R. Tolkien   |
        When Admin sends a PUT request to the update book endpoint
        Then Admin should receive 404 status code

    Scenario: Admin fails to update a book with mismatched URL and body ID
        Given Admin has the following book details for update:
            | id   | title            | author           |
            | 103  | The Hobbit       | J.R.R. Tolkien   |
        When Admin sends a PUT request to the update book endpoint with a different ID in the URL
        Then Admin should receive 400 status code 

    Scenario: Admin fails to update a book with unauthorized access
        Given Admin has the following book details for update:
            | id   | title                  | author             |
            | 1    | Village by The Sea     | Anita Desai        |
        And Admin does not use valid credentials
        When Admin sends a PUT request to the update book endpoint
        Then Admin should receive 401 status code         