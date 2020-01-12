/// <reference types="Cypress" />

describe('Test 2', function() {
  it('Does not do much!', function() {
    cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');
    cy.get('.search-keyword').type('ca');
    cy.wait(2000);

    // Selenium 'get' hits the url in the browser,
    //cypress 'get' acts like findElement of Selenium

    // Parent child chaining
    cy.get('.products').as('productLocator');
    cy.get('@productLocator')
      .find('.product')
      .each(($el, index, $list) => {
        const textVeg = $el.find('h4.product-name').text();
        if (textVeg.includes('Cashews')) {
          $el.find('button').click();
        }
      });
    cy.get('.cart-icon > img').click();
    cy.contains('PROCEED TO CHECKOUT').click();
    cy.contains('Place Order').click();
  });
});
