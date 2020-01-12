/// <reference types="Cypress" />

import HomePage from '../../support/pageObjects/HomePage';
import ProductPage from '../../support/pageObjects/ProductPage';
import ShoppingCartPage from '../../support/pageObjects/ShoppingCartPage';
import CheckOutPage from '../../support/pageObjects/CheckOutPage';

describe('Main Framework', function() {
  before(function() {
    // runs once before all tests in block
    cy.fixture('example').then(function(data) {
      this.data = data;
    });
  });

  it('Does not do much!', function() {
    const homePage = new HomePage();
    const productPage = new ProductPage();
    const shoppingCartPage = new ShoppingCartPage();
    const checkOutPage = new CheckOutPage();

    cy.visit(Cypress.env('url') + '/angularpractice/');

    homePage.getEditBox().type(this.data.name);
    homePage.getGender().select(this.data.gender);
    homePage.getTwoWayDataBinding().should('have.value', this.data.name);
    homePage.getEditBox().should('have.attr', 'minlength', '2');
    homePage.getEntrpreneur().should('be.disabled');

    //cy.pause();

    Cypress.config('defaultCommandTimeout', 10000);

    homePage.getShopTab().click();

    //.debug()

    this.data.productName.forEach(element => {
      cy.selectProduct(element);
    });
    // cy.selectProduct('Blackberry');
    // cy.selectProduct('Nokia Edge');

    productPage.checkOutButton().click();

    // get the sum of two items in shopping cart
    // and compare with the total listed on the page
    let sum = 0;

    cy.get('tr td:nth-child(4) strong')
      .each(($el, index, $list) => {
        const actualText = $el.text();
        let res = actualText.split(' ');
        res = res[1].trim();
        sum = Number(sum) + Number(res);
      })
      .then(function() {
        cy.log(sum);
      });

    cy.get('h3 strong').then(function(element) {
      const amount = element.text();
      let res = amount.split(' ');
      let total = res[1].trim();
      expect(Number(total)).to.equal(sum);
    });

    shoppingCartPage.getCheckOutButton().click();
    checkOutPage.getCountry().type('India');
    checkOutPage.getCountrySuggestions().click();
    checkOutPage.getTermsAndConditionsCheckbox().check({ force: true });
    checkOutPage.getPurchaseButton().click();

    // Two different ways to assert because there are spacess before the string
    // first way is to use include instead of contain
    // cy.get('.alert').should(
    //   'include.text',
    //   'Success! Thank you! Your order will be delivered in next few weeks :-).'
    // );

    // second way is to use chai/mocha in a manually resolved promise
    checkOutPage.getConfirmationMessage().then(function(element) {
      const actualText = element.text();
      expect(actualText.includes('Success')).to.be.true;
    });
  });
});
