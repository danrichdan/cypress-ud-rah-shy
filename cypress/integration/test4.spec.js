/// <reference types="Cypress" />

describe('Test 4', function() {
  it('Does not do much!', function() {
    //cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
    cy.visit(Cypress.env('other_url') + '/practice.php');

    cy.get('#alertbtn').click();
    cy.get('[value="Confirm"]').click();

    // window:alert
    cy.on('window:alert', str => {
      // Mocha
      expect(str).to.equal(
        'Hello , share this practice page and share your knowledge'
      );
    });
    // window:alert
    cy.on('window:confirm', str => {
      // Mocha
      expect(str).to.equal('Hello , Are you sure you want to confirm?');
    });

    // Does not open tabs o new windows, use jquery to remove target=_blank attribute
    cy.get('#opentab')
      .invoke('removeAttr', 'target')
      .click();

    // Added wait so youtube video could load before leaving the page
    cy.wait(4000);
    cy.url().should('include', 'qaclickacademy');

    // Has browser go back to previous page
    cy.go('back');
  });
});
