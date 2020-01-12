class ShoppingCartPage {
  getCheckOutButton() {
    return cy.contains('Checkout');
  }
}

export default ShoppingCartPage;
