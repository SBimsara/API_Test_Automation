import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

Given('User visits the login page', () => {
    cy.visit('/web/index.php/auth/login');
});

When('User enters valid credentials', () => {
    cy.fixture('users.json').then((users) => {
      cy.get('input[name="username"]').type(users.valid.username)
      cy.get('input[name="password"]').type(users.valid.password)
    });
    cy.get('button[type="submit"]').click();
});
  
Then('User should be redirected to the dashboard', () => {
    cy.url().should('include', '/web/index.php/dashboard/index');
});

When ('User enters invalid credentials', () => {
    cy.fixture('users.json').then((users) => {
      cy.get('input[name=username]').type(users.invalid.username)
      cy.get('input[name=password]').type(users.invalid.password)
    });
    cy.get('button[type=submit]').click();
});
  
Then('User should see an error message', () => {
    cy.contains('Invalid credentials').should('be.visible')
});