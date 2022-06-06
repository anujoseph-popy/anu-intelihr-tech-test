/// <reference types="cypress" />

// As an authenticated user <normal user>
// When I visit <tenant>/auth/login
// Then I should see the login page
// When I login with the correct credentials
// Then I should see the dashboard
// Verify the greeting is visible (eg. Good Morning, <name>)

describe('An authenticated user navigating to Dashboard', () => {
    beforeEach(() => {
        cy.visit('https://qa-tech-test-anu-demo.intellihr.net/auth/login')

    })

    it('Dashboard with greetings should be visible', () => {
        //checking if login form is visible and logging in
        cy.get('#username').should('be.visible')
            .get('#password').should('be.visible')
            // logging in with username and password
            .get('#username').type('ally.m')
            .get('#password').type('Ally-Want$-To-Test-T3n4nt')
            // submit form
            .get('button.primary.expanded').contains('Sign In').click()
        // checking if redirected to dashboard
        cy.location('pathname').should('eq', '/spa/dashboard')
        //wait 3 sec for dashboard to load
        cy.wait(3000)
        var today = new Date()
        var time = today.getHours()
        if (time > 0 && time < 12) {
            cy.get('h1').should('contain.text', 'Good morning')
        } else if (time >= 12 && time < 18) {
            cy.get('h1').should('contain.text', 'Good afternoon')
        } else if (time >= 18 && time <= 23) {
            cy.get('h1').should('contain.text', 'Good evening')
        }
    })

})