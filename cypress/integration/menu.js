describe('Menu Navigation', () => {
  before(() => {
    cy.visit('/unknown');
  });

  describe('Menu: Login', () => {
    it('Menu: Login Text', () => {
      cy.get(':nth-child(3) > .nav-link').should('have.text', 'Login');
    });

    it('Menu: Login Href', () => {
      cy.get(':nth-child(3) > .nav-link')
        .should('have.attr', 'href')
        .and('include', '/login');
    });

    it('Menu: Login RouterLink', () => {
      cy.get(':nth-child(3) > .nav-link')
        .and('have.attr', 'routerLink')
        .and('include', '/login');
    });
  });

  describe('Menu: Signup', () => {
    it('Menu: Signup Text', () => {
      cy.get(':nth-child(4) > .nav-link').should('have.text', 'Signup');
    });

    it('Menu: Signup Href', () => {
      cy.get(':nth-child(4) > .nav-link')
        .should('have.attr', 'href')
        .and('include', '/signup');
    });

    it('Menu: Signup RouterLink', () => {
      cy.get(':nth-child(4) > .nav-link')
        .and('have.attr', 'routerLink')
        .and('include', '/signup');
    });
  });

  describe('Menu: Unknown', () => {
    it('Menu: Unknown Text', () => {
      cy.get(':nth-child(1) > :nth-child(2) > .nav-link').should('have.text', '"Unknown"');
    });

    it('Menu: Unknown', () => {
      cy.get(':nth-child(1) > :nth-child(2) > .nav-link')
        .should('have.attr', 'href')
        .and('include', '/unknown');
    });

    it('Menu: Unknown RouterLink', () => {
      cy.get(':nth-child(1) > :nth-child(2) > .nav-link')
        .and('have.attr', 'routerLink')
        .and('include', '/unknown');
    });
  });

  describe('Menu: All Items', () => {
    it('Menu: All Items', () => {
      cy.get(':nth-child(1) > .nav-link').should('have.text', 'All Items');
    });

    it('Menu: All Items Href', () => {
      cy.get(':nth-child(1) > .nav-link')
        .should('have.attr', 'href')
        .and('include', '/');
    });

    it('Menu: All Items RouterLink', () => {
      cy.get(':nth-child(1) > .nav-link')
        .and('have.attr', 'routerLink')
        .and('include', '/');
    });
  });
});
