/// <reference types="Cypress" />

describe('Partial Framework', function() {
  before(function() {
    // runs once before all tests in block
    cy.fixture('example').then(function(data) {
      this.data = data;
    });
  });
  it('Does not do much!', function() {
    cy.visit(Cypress.env('url') + '/angularpractice/');

    cy.get('input[name="name"]:nth-child(2)').type(this.data.name);
    cy.get('select').select(this.data.gender);
    cy.get(':nth-child(4) > .ng-untouched').should(
      'have.value',
      this.data.name
    );
    cy.get('input[name="name"]:nth-child(2)').should(
      'have.attr',
      'minlength',
      '2'
    );
    cy.get('#inlineRadio3').should('be.disabled');
    //cy.pause();
    cy.get(':nth-child(2) > .nav-link').click();
    //.debug()
    this.data.productName.forEach(element => {
      cy.selectProduct(element);
    });
    // cy.selectProduct('Blackberry');
    // cy.selectProduct('Nokia Edge');
  });
});
