/// <reference types="cypress" />

// As an authenticated user <Admin>
// When I visit <tenant>/spa/settings/skills
// Then I press 'Create Skill' button
// Then I enter all of the mandatory data
// Then I press 'Save' button
// Then I see 1 newly Skill listed
//
// Then I create a new skill once again
// Then I see 2 Skills listed
// When I select the kebab menu for the second skill
// Then I select 'Delete' option
// Then I confirm, by selecting the 'Delete' option
// Verify out of the 2 skills created, only the first skill is listed


describe('An authenticated Admin user navigating to Dashboard', () => {
    beforeEach(() => {
        cy.visit('https://qa-tech-test-anu-demo.intellihr.net/auth/login')
        //checking if login form is visible and logging in
            .get('#username').should('be.visible')
            .get('#password').should('be.visible')
            // logging in with username and password
            .get('#username').type('sara.h')
            .get('#password').type('Uncle-Ben-$aid-With-@dmin-P0wer-Comes-???')
            // submit form
            .get('button.primary.expanded').contains('Sign In').click()

    })

    it('Creating and deleting new skills', () => {

        // checking if redirected to dashboard
        cy.visit('https://qa-tech-test-anu-demo.intellihr.net/spa/settings/skills')
        //wait 3 sec for dashboard to load
        cy.wait(3000)
        // click on create skill
        cy.get('span.primary').contains('Create Skill').parent('a').click()
        // fill in values
            .get('#name').type('Skill 1')
            .get('.Select-multi-value-wrapper').click()
            .get('.Select-menu-outer').children('div').contains('Accounting').click()
            .get('#description').type('Skill 1 Description')
            .get('button.primary').contains('Save').click()
            // check if first skill is the newly created skill
            .get("div[data-component-type=card]").first().contains('Skill 1')

        // again creating new skill
        cy.get('span.primary').contains('Create Skill').parent('a').click()
            // fill in values
            .get('#name').type('Skill 2')
            .get('.Select-multi-value-wrapper').click()
            .get('.Select-menu-outer').children('div').contains('Accounting').click()
            .get('#description').type('Skill 2 Description')
            .get('button.primary').contains('Save').click()
            // check if first skill is the newly created skill
            .get("div[data-component-type=card]").first().contains('Skill 2')

            // deleting the second skill
        cy.children('button[aria-haspopup=true]').click()
            .get('li[role=meuitem]').contains('Delete').should('be.visible').click()
            .get("div[data-component-type=card]").first().should('not.contain','Skill 2')

    })

})