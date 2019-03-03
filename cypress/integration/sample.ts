describe.only('Menu Navigation', () => {
  before(() => {
    cy.visit('');
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

describe('Navigation: Login and Create Account Pages', () => {
  it('Login to Signup', () => {
    cy.visit('login');
    cy.url().should('include', '/login');

    cy.get('.btn-link')
      .should('have.text', 'create account')
      .click();

    cy.url().should('include', 'signup');
  });

  it('Signup to Login', () => {
    cy.visit('signup');
    cy.url().should('include', '/signup');

    cy.get('.btn-link')
      .should('have.text', 'login to existing account')
      .click();

    cy.url().should('include', 'login');
  });
});

describe('Account Test', () => {
  it('Create Account, Verify Header, Logout and Login', () => {
    const userName = `${Math.random()
      .toString(36)
      .substring(2, 15)}${Math.random()
      .toString(36)
      .substring(2, 15)}@uitest.com`;
    const password = `${Math.random()
      .toString(36)
      .substring(2, 15)}${Math.random()
      .toString(36)
      .substring(2, 15)}`;
    cy.visit('/signup')
      .url()
      .should('include', '/signup');

    cy.get('#email').type(userName);
    cy.get('#password').type(password);
    cy.get('.btn-primary')
      .should('have.text', 'Sign Up')
      .click()
      .url()
      .should('include', '/');

    cy.get('.nav-item.nav-link').should('have.text', `Welcome ${userName}`);
    cy.get(':nth-child(2) > :nth-child(2) > .nav-link')
      .should('have.text', 'logout')
      .click()
      .should('not.be.visible')
      .url()
      .should('include', '/login');

    cy.get('#email').type(userName);
    cy.get('#password').type(password);
    cy.get('.btn-primary')
      .should('have.text', 'Login')
      .click()
      .url()
      .should('include', '/');
  });

  it('Login to Non-Existent Account', () => {
    cy.visit('/login')
      .url()
      .should('include', '/login');

    const bogusUserName = `${Math.random()
      .toString(36)
      .substring(2, 15)}${Math.random()
      .toString(36)
      .substring(2, 15)}@uitest.com`;
    const bogusPassword =
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15);

    cy.get('#email').type(bogusUserName);
    cy.get('#password').type(bogusPassword);
    cy.get('.btn-primary')
      .should('have.text', 'Login')
      .click();
    cy.get('.alert.alert-danger').should('have.text', 'Invalid Login');
  });
});
