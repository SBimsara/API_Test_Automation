
// // Import the required dependencies
// const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');

// // Function to encode the credentials to base64
// function encodeBasicAuth(username, password) {
//   return `Basic ${btoa(username + ':' + password)}`;
// }

// // Step definitions for Given
// Given('Admin is logged in with the username {string} and password {string}', (username, password) => {
//   Cypress.env('authCredentials', { username, password });
// });

// Given('User logged in with the username {string} and password {string} ok', (username, password) => {
//   Cypress.env('authCredentials', { username, password });
// });

// Given('the book ID is {int}', (bookId) => {
//   Cypress.env('bookId', bookId); // Store the book ID in the environment
// });

// // Step definitions for When
// When('Admin requests to get all books', () => {
//   const authCredentials = Cypress.env('authCredentials');
  
//   const authHeader = authCredentials
//     ? { Authorization: encodeBasicAuth(authCredentials.username, authCredentials.password) }
//     : {};

//   cy.request({
//     method: 'GET',
//     url: `/api/books`, // Replace with your actual endpoint for all books
//     failOnStatusCode: false, // Prevent Cypress from failing on non-2xx status codes
//     headers: authHeader,
//   }).as('getAllBooksResponse');
// });

// When('User requests to get all books', () => {
//   const authCredentials = Cypress.env('authCredentials');
  
//   const authHeader = authCredentials
//     ? { Authorization: encodeBasicAuth(authCredentials.username, authCredentials.password) }
//     : {};

//   cy.request({
//     method: 'GET',
//     url: `/api/books`, // Replace with your actual endpoint for all books
//     failOnStatusCode: false, // Prevent Cypress from failing on non-2xx status codes
//     headers: authHeader,
//   }).as('getAllBooksResponse');
// });

// When('Admin requests to get the book', () => {
//   const authCredentials = Cypress.env('authCredentials');
//   const bookId = Cypress.env('bookId');

//   const authHeader = authCredentials
//     ? { Authorization: encodeBasicAuth(authCredentials.username, authCredentials.password) }
//     : {};

//   cy.request({
//     method: 'GET',
//     url: `/api/books/${bookId}`, // API endpoint to get a specific book by ID
//     failOnStatusCode: false,
//     headers: authHeader,
//   }).as('getBookResponse');
// });

// When('User requests to get the book', () => {
//   const authCredentials = Cypress.env('authCredentials');
//   const bookId = Cypress.env('bookId');

//   const authHeader = authCredentials
//     ? { Authorization: encodeBasicAuth(authCredentials.username, authCredentials.password) }
//     : {};

//   cy.request({
//     method: 'GET',
//     url: `/api/books/${bookId}`, // API endpoint to get a specific book by ID
//     failOnStatusCode: false,
//     headers: authHeader,
//   }).as('getBookResponse');
// });

// // Step definitions for Then
// Then('the response status code should be exactly {int}', (statusCode) => {
//   cy.get('@getAllBooksResponse').then((response) => {
//     expect(response.status).to.eq(statusCode);
//   });
// });

// Then('the response should contain a list of books', () => {
//   cy.get('@getAllBooksResponse').then((response) => {
//     expect(response.body).to.be.an('array'); // Ensure the response is an array
//     expect(response.body.length).to.be.greaterThan(0); // Check that there is at least one book
//   });
// });

// Then('the response status code should be correctly {int}', (statusCode) => {
//   cy.get('@getBookResponse').then((response) => {
//     expect(response.status).to.eq(statusCode);
//   });
// });

// Then('the response should contain the book details', () => {
//   cy.get('@getBookResponse').then((response) => {
//     expect(response.body).to.have.property('id', Cypress.env('bookId')); // Ensure the response contains the correct book ID
//     expect(response.body).to.have.property('title'); // Ensure the response contains a title property (modify according to your API's structure)
//     expect(response.body).to.have.property('author'); // Ensure the response contains an author property (modify accordingly)
//   });
// });


// Import the required dependencies
const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');

// Function to encode the credentials to base64
function encodeBasicAuth(username, password) {
  return `Basic ${btoa(username + ':' + password)}`;
}

// Step definitions for Given
Given('Admin is logged in with the username {string} and password {string}', (username, password) => {
  Cypress.env('authCredentials', { username, password });
});

Given('User is logged in with the username {string} and password {string}', (username, password) => {
  Cypress.env('authCredentials', { username, password });
});

Given('the book ID is {int}', (bookId) => {
  Cypress.env('bookId', bookId); // Store the book ID in the environment
});

// Step definitions for When
When('Admin requests to get all books', () => {
  const authCredentials = Cypress.env('authCredentials');
  
  const authHeader = authCredentials
    ? { Authorization: encodeBasicAuth(authCredentials.username, authCredentials.password) }
    : {};

  cy.request({
    method: 'GET',
    url: `/api/books`, // Replace with your actual endpoint for all books
    failOnStatusCode: false, // Prevent Cypress from failing on non-2xx status codes
    headers: authHeader,
  }).as('getAllBooksResponse');
});

When('User requests to get all books', () => {
  const authCredentials = Cypress.env('authCredentials');
  
  const authHeader = authCredentials
    ? { Authorization: encodeBasicAuth(authCredentials.username, authCredentials.password) }
    : {};

  cy.request({
    method: 'GET',
    url: `/api/books`, // Replace with your actual endpoint for all books
    failOnStatusCode: false, // Prevent Cypress from failing on non-2xx status codes
    headers: authHeader,
  }).as('getAllBooksResponse');
});

When('Admin requests to get the book', () => {
  const authCredentials = Cypress.env('authCredentials');
  const bookId = Cypress.env('bookId');

  const authHeader = authCredentials
    ? { Authorization: encodeBasicAuth(authCredentials.username, authCredentials.password) }
    : {};

  cy.request({
    method: 'GET',
    url: `/api/books/${bookId}`, // API endpoint to get a specific book by ID
    failOnStatusCode: false,
    headers: authHeader,
  }).as('getBookResponse');
});

When('User requests to get the book', () => {
  const authCredentials = Cypress.env('authCredentials');
  const bookId = Cypress.env('bookId');

  const authHeader = authCredentials
    ? { Authorization: encodeBasicAuth(authCredentials.username, authCredentials.password) }
    : {};

  cy.request({
    method: 'GET',
    url: `/api/books/${bookId}`, // API endpoint to get a specific book by ID
    failOnStatusCode: false,
    headers: authHeader,
  }).as('getBookResponse');
});

// Step definitions for Then
Then('the response status code should be exactly {int}', (statusCode) => {
  cy.get('@getAllBooksResponse').then((response) => {
    expect(response.status).to.eq(statusCode);
  });
});

Then('the response should contain a list of books', () => {
  cy.get('@getAllBooksResponse').then((response) => {
    expect(response.body).to.be.an('array'); // Ensure the response is an array
    expect(response.body.length).to.be.greaterThan(0); // Check that there is at least one book
  });
});

Then('the response status code should be correctly {int}', (statusCode) => {
  cy.get('@getBookResponse').then((response) => {
    expect(response.status).to.eq(statusCode);
  });
});

Then('the response should contain the book details', () => {
  cy.get('@getBookResponse').then((response) => {
    expect(response.body).to.have.property('id', Cypress.env('bookId')); // Ensure the response contains the correct book ID
    expect(response.body).to.have.property('title'); // Ensure the response contains a title property (modify according to your API's structure)
    expect(response.body).to.have.property('author'); // Ensure the response contains an author property (modify accordingly)
  });
});
