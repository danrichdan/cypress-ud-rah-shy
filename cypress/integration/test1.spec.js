/// <reference types="Cypress" />

describe('Test 1', function() {
  it('Does not do much!', function() {
    cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');
    cy.get('.search-keyword').type('ca');
    cy.wait(2000);

    // Selenium 'get' hits the url in the browser,
    //cypress 'get' acts like findElement of Selenium
    cy.get('.product').should('have.length', 5);
    cy.get('.product:visible').should('have.length', 4);

    // Parent child chaining
    cy.get('.products').as('productLocator');
    cy.get('@productLocator')
      .find('.product')
      .should('have.length', 4);
    cy.get(':nth-child(3) > .product-action > button').click();

    // eq -- Finds via index, like an array starts at 0
    cy.get('@productLocator')
      .find('.product')
      .eq(2)
      .contains('ADD TO CART')
      .click()
      .then(function() {
        console.log('sf');
      });

    cy.get('@productLocator')
      .find('.product')
      .each(($el, index, $list) => {
        const textVeg = $el.find('h4.product-name').text();
        if (textVeg.includes('Cashews')) {
          $el.find('button').click();
        }
      });

    //assert if logo text is correctly displayed
    cy.get('.brand img').should('have.attr', 'src').and('include', 'logo');
    //should('have.text', 'GREENKART');

    //This is to print in logs
    cy.get('.brand img').then(function(logoElement) {
      cy.log(logoElement.attr('src'));
    });
    //cy.log(logo.text())
    //.text() -- a JQuery function, Cypress returns JQuery Objects
    //fixture
  });
});
