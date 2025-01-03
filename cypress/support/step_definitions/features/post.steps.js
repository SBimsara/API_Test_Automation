import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

let authHeaders; // Variable to store the authentication headers
let response;    // Variable to store the API response

Given('User logged in as the {word}', (role) => {
    cy.fixture('credentials.json').then((credentials) => {

        let userCredentials;

        if(role.toLowerCase() === 'admin'){
            userCredentials = credentials.admin;
        }
        else if(role.toLowerCase() === 'user'){
            userCredentials = credentials.user;
        }
        else{
            throw new Error(`Unsupported role: ${role}`);
        }
        const encodedCredentials = btoa(`${userCredentials.username}:${userCredentials.password}`);
        authHeaders = {
            Authorization: `Basic ${encodedCredentials}`, // Use Basic Authentication
        };
    });
});
Given('{word} have the following book details:', (role, dataTable) => {

    if(role.toLowerCase() === 'admin' || role.toLowerCase() === 'user'){
        // Store the book details in the test context
        cy.wrap(dataTable.hashes()[0]).as('bookDetails');
    }
    else{
        throw new Error(`Unsupported role: ${role}`);
    }

});

Given('{word} has an empty payload for book details', (role) => {

    if(role.toLowerCase() === 'admin' || role.toLowerCase() === 'user'){
        //create an empty payload for book details
        cy.wrap({}).as('bookDetails');
    }
    else{
        throw new Error(`Unsupported role: ${role}`);
    }

});

When('{word} send a POST request to the create book endpoint', function (role) {

    if(role.toLowerCase() === 'admin' || role.toLowerCase() === 'user'){
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
    }
    else{
        throw new Error(`Unsupported role: ${role}`);
    }

});

Then('{word} should receive a {int} status code', (role, statusCode) => {
    if(role.toLowerCase() === 'admin' || role.toLowerCase() === 'user'){
        expect(response.status).to.eq(statusCode);
    }
    else{
        throw new Error(`Unsupported role: ${role}`);
    }

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

Then('the response should contain the error message {string}', (errorMessage) => {
    expect(response.body.message).to.eq(errorMessage);
});

