/// <reference types="cypress" />

// As a non-logged in user
// When I visit <tenant>/spa/settings
// Then I should see the login page <tenant>/auth/login
// Verify username and password fields are visible

describe('A non authenticated user accessing tenant page', () => {
    it('it should redirect to auth/login', () => {
        cy.visit('https://qa-tech-test-anu-demo.intellihr.net/spa/settings')
            // check if redirected to /auth/login
            .location('pathname').should('eq', '/auth/login')
            // check if username and password are visible
            .get('#username').should('be.visible')
            .get('#password').should('be.visible')
    });

})