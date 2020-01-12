class CheckOutPage {
  getCountry() {
    return cy.get('#country');
  }
  getCountrySuggestions() {
    return cy.get('.suggestions > ul > li > a');
  }
  getTermsAndConditionsCheckbox() {
    return cy.get('#checkbox2');
  }
  getPurchaseButton() {
    return cy.get('input[type="submit"]');
  }
  getConfirmationMessage() {
    return cy.get('.alert');
  }
}

export default CheckOutPage;
