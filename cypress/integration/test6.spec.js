/// <reference types="Cypress" />

describe('Test 6', function() {
  it('Does not do much!', function() {
    cy.visit(Cypress.env('url') + '/AutomationPractice/');

    cy.get('div.mouse-hover-content').invoke('show');
    cy.contains('Top').click();
    cy.url().should('include', 'top');
  });
});
