import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

let authHeaders;
let response;

Given('User is authenticated as an {string}', (role) => {
    cy.fixture('credentials.json').then((credentials) => {
        const user = credentials[role.toLowerCase()]; // Dynamic role fetching
        const encodedCredentials = btoa(`${user.username}:${user.password}`);
        authHeaders = {
            Authorization: `Basic ${encodedCredentials}`,
        };
    });
});

Given('the API endpoint is {string}', () => {
    // Store the API endpoint or use it dynamically if needed
    cy.wrap('/api/books/{int}').as('endpoint');
});

When('A {string} tries to delete a book with id {int}', function (role, bookId) {
    cy.get('@endpoint').then((endpoint) => {
        cy.request({
            method: 'DELETE',
            url: `${endpoint.replace('{int}', bookId)}`,  // Replace the placeholder with bookId
            headers: authHeaders,
            failOnStatusCode: false, // Prevents test failure on non-2xx responses
        }).then((res) => {
            response = res;
        });
    });
});

Then('The API should return a {int} status code for the {string}', (statusCode, role) => {
    expect(response.status).to.eq(statusCode);
});

// Then('The response body should indicate {string}', (message) => {
//     expect(response.body.message).to.eq(message);
// });
Then('The response body should indicate {string}', (expectedMessage) => {
    // Directly check the response body for the expected message
    expect(response.body).to.eq(expectedMessage);
});

// Then('A bug should be logged stating {string}', (bugMessage) => {
//     // Log a bug as part of the test
//     cy.log(`Bug: ${bugMessage}`);
// });

Then('The functionality should be reported as an undocumented feature', () => {
    cy.log('Feature: Regular user deleting book is an undocumented feature.');
});
