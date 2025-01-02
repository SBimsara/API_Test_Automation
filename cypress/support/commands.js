// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (username, password) => {
    // If no credentials are passed, use default admin credentials from a fixture
    if (!username || !password) {
        cy.fixture('credentials.json').then((credentials) => {
            username = credentials.admin.username;
            password = credentials.admin.password;
        });
    }

    // Perform the login request using API
    return cy.request({
        method: 'POST',
        url: '/api/login', // Adjust this to your backend login endpoint
        body: {
            username,
            password,
        },
    }).then((response) => {
        // Verify successful login and store the token
        expect(response.status).to.eq(200); // Ensure login is successful
        cy.setCookie('auth_token', response.body.token); // Save auth token as a cookie
    });
});


// Cypress.Commands.add('navigateToModule', (moduleName) => {
//     cy.xpath('//*[@id="app"]/div[1]/div[1]/aside/nav/div[2]/ul/li[1]/a')
//             .should('be.visible') // Ensure it's visible
//             .click();

    
// });