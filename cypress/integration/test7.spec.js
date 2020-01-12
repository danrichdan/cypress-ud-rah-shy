/// <reference types="Cypress" />

describe('Test 7', function() {
  it('Does not do much!', function() {
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/');

    cy.get('#opentab').then(function(el) {
      const url = el.prop('href');
      cy.log(url);
      cy.visit(url);
    });
  });
});
