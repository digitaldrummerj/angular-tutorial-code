describe('Menu Navigation', () => {
  before(() => {
    cy.visit('/unknown');
  });

  it('Right Menu: Number of Items', () => {
    cy.get('[data-cy="leftMenu"] .nav-link')
      .should('have.length', 4);
  });

  it('Left Menu: Number of Items', () => {
    cy.get('[data-cy="rightMenu"] .nav-link')
      .should('have.length', 2);
  });

  describe('Left Menu: Order of Items', () => {
    it('Menu: All Items', () => {
      cy.get('[data-cy="leftMenu"] .nav-link').eq(0).should('have.text', 'All Items');
    });

    it('Menu: Unknown Text', () => {
      cy.get('[data-cy="leftMenu"] .nav-link').eq(1).should('have.text', '"Unknown"');
    });

    it('Menu: Login Order', () => {
      cy.get('[data-cy="leftMenu"] .nav-link').eq(2).should('have.text', 'Login');
    });

    it('Menu: Signup Text', () => {
      cy.get('[data-cy="leftMenu"] .nav-link').eq(3).should('have.text', 'Signup');
    });
  });

  describe('Right Menu: Order of Items', () => {
    it('Menu: Welcome Items', () => {
      cy.get('[data-cy="rightMenu"] .nav-link').eq(0)
      .should('contain', 'Welcome');
    });

    it('Menu: Logout', () => {
      cy.get('[data-cy="rightMenu"] .nav-link').eq(1).should('have.text', 'logout');
    });
  });

  describe('Menu: Login', () => {
    it('Menu: Login Href', () => {
      cy.get('[data-cy="leftMenu"] .nav-link').eq(2)
        .should('have.attr', 'href')
        .and('include', '/login');
    });

    it('Menu: Login RouterLink', () => {
      cy.get('[data-cy="leftMenu"] .nav-link').eq(2)
        .and('have.attr', 'routerLink')
        .and('include', '/login');
    });
  });

  describe('Menu: Signup', () => {
    it('Menu: Signup Href', () => {
      cy.get('[data-cy="leftMenu"] .nav-link').eq(3)
        .should('have.attr', 'href')
        .and('include', '/signup');
    });

    it('Menu: Signup RouterLink', () => {
      cy.get('[data-cy="leftMenu"] .nav-link').eq(3)
        .and('have.attr', 'routerLink')
        .and('include', '/signup');
    });
  });

  describe('Menu: Unknown', () => {
    it('Menu: Unknown', () => {
      cy.get('[data-cy="leftMenu"] .nav-link').eq(1)
        .should('have.attr', 'href')
        .and('include', '/unknown');
    });

    it('Menu: Unknown RouterLink', () => {
      cy.get('[data-cy="leftMenu"] .nav-link').eq(1)
        .and('have.attr', 'routerLink')
        .and('include', '/unknown');
    });
  });

  describe('Menu: All Items', () => {
    it('Menu: All Items Href', () => {
      cy.get('[data-cy="leftMenu"] .nav-link').eq(0)
        .should('have.attr', 'href')
        .and('include', '/');
    });

    it('Menu: All Items RouterLink', () => {
      cy.get('[data-cy="leftMenu"] .nav-link').eq(0)
        .and('have.attr', 'routerLink')
        .and('include', '/');
    });
  });
});
