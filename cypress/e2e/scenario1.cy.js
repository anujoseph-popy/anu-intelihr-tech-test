/// <reference types="cypress" />

// As an anonymous User
// When I visit https://www.intellihr.com
//     Then I should see the intelliHR public homepage
// Verify intelliHR logo is visible
// When I scroll to the bottom and select 'Case Studies'
// Then I should see multiple Case Studies
// When I select 'Fujitsu General'
// Then I should see a Case Study for Fujitsu
//   Verify 'Download now' button is visible

describe('A non authenticated user navigating home page', () => {
  beforeEach(() => {
    cy.visit('https://www.intellihr.com')
  })

  it('navigate to case study pge and it should have the Download button visible', () => {
    cy.get('.header-logo-img').should('be.visible')
    cy.scrollTo('bottom')
    cy.get('.menu-item-1615').children('a').click()
      // checking if there is ore than 4 case studies
      .get('.post-thumbnail-container').should('have.length.greaterThan', 4)
      //Checking if the page has Fujitsu General case study and then clicking on that
      .get('.post-thumbnail-container').contains('Fujitsu General').parent('.post-thumbnail-container').click()
      // verifying download button is visible
      .get('.mktoButton').contains('Download now').should('be.visible')
  })

})
