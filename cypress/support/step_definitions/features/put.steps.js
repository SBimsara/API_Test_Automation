import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

let authHeaders; // Variable to store the authentication headers
let response;    // Variable to store the API response

Given('User logged in as admin', () => {
    cy.fixture('credentials.json').then((credentials) => {
        const encodedCredentials = btoa(`${credentials.admin.username}:${credentials.admin.password}`);
        authHeaders = {
            Authorization: `Basic ${encodedCredentials}`, // Use Basic Authentication
        };
    });
});

Given('Admin does not use valid credentials', () => {
    cy.fixture('credentials.json').then((credentials) => {
        const encodedInvalidCredentials = btoa(`${credentials.admin.username}:${credentials.admin.invalidPassword}`);
        authHeaders = {
            Authorization: `Basic ${encodedInvalidCredentials}`, 
        };
    });
});

Given('User logged in as user', () => {
    cy.fixture('credentials.json').then((credentials) => {
        const encodedInvalidCredentials = btoa(`${credentials.user.username}:${credentials.user.invalidPassword}`);
        authHeaders = {
            Authorization: `Basic ${encodedInvalidCredentials}`, 
        };
    });
});

Given('Admin has the following book details for update:', (dataTable) => {
    cy.wrap(dataTable.hashes()[0]).as('bookDetails');
});

When('Admin sends a PUT request to the update book endpoint', function () {
    cy.get('@bookDetails').then((bookDetails) => {
        cy.request({
            method: 'PUT',
            url: `/api/books/${bookDetails.id}`, // Use the ID from the details for the endpoint
            headers: authHeaders,               // Include the authentication headers
            body: bookDetails,
            failOnStatusCode: false,            // Allow handling non-2xx responses
        }).then((res) => {
            response = res; // Store the response for later assertions
        });
    });
});

When('Admin sends a PUT request to the update book endpoint with a different ID in the URL', function () {
    cy.get('@bookDetails').then((bookDetails) => {
        cy.request({
            method: 'PUT',
            url: `/api/books/9999`, // Use a mismatched ID in the URL
            headers: authHeaders,
            body: bookDetails,
            failOnStatusCode: false,
        }).then((res) => {
            response = res; 
        });
    });
});

Then('Admin should receive {int} status code', (statusCode) => {
    expect(response.status).to.eq(statusCode);
});

Then('the response should contain the updated book details', function () {
    cy.get('@bookDetails').then((bookDetails) => {
        const { id, ...expectedDetails } = bookDetails;
        expect(response.body.id.toString()).to.eq(bookDetails.id);
        expect(response.body).to.deep.include(expectedDetails);
        
    });
});
