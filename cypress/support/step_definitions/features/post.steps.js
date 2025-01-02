import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

let authHeaders; // Variable to store the authentication headers
let response;    // Variable to store the API response

Given('User logged in as an admin', () => {
    cy.fixture('credentials.json').then((credentials) => {
        const encodedCredentials = btoa(`${credentials.admin.username}:${credentials.admin.password}`);
        authHeaders = {
            Authorization: `Basic ${encodedCredentials}`, // Use Basic Authentication
        };
    });
});
Given('Admin have the following book details:', (dataTable) => {
    // Store the book details in the test context
    cy.wrap(dataTable.hashes()[0]).as('bookDetails');
});

When('Admin send a POST request to the create book endpoint', function () {
    cy.get('@bookDetails').then((bookDetails) => {
        cy.request({
            method: 'POST',
            url: '/api/books', // Replace with your actual endpoint
            headers: authHeaders,               // Include the authentication headers
            body: bookDetails,
        }).then((res) => {
            response = res; // Store the response for later assertions
        });
    });
});

Then('Admin should receive a {int} status code', (statusCode) => {
    expect(response.status).to.eq(statusCode);
});


Then('the response should contain the created book details', function () {
    cy.get('@bookDetails').then((bookDetails) => {
        expect(response.body).to.deep.include(bookDetails);
    });
});

Then('the response should contain the created book details, including id', () => {
    cy.get('@bookDetails').then((bookDetails) => {
        // Exclude the `id` field from the book details
        const { id, ...expectedDetails } = bookDetails;

        // Assert that the response body includes the expected details (without `id`)
        expect(response.body).to.deep.include(expectedDetails);
    });
});

