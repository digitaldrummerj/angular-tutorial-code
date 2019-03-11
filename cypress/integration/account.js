import { recordReplayCommands } from '../support/recordReplayCommands';

describe('Navigation: Login and Create Account Pages', () => {
  it('Login to Signup', () => {
    cy.visit('login');
    cy.location('pathname').should('eq', '/login');

    cy.get('[data-cy="createAccountLink"]')
      .should('have.text', 'create account')
      .click();

    cy.location('pathname').should('eq', '/signup');
  });

  it('Signup to Login', () => {
    cy.visit('signup');
    cy.location('pathname').should('eq', '/signup');

    cy.get('[data-cy="loginLink')
      .should('have.text', 'login to existing account')
      .click();

    cy.location('pathname').should('eq', '/login');
  });
});

describe('Account Test', () => {
  recordReplayCommands('account-test', 0);
  it('Create Account, Verify Header, Logout and Login', () => {
    const userName = 'au0muoxay6jshfn9hwiwi8@uitest.com';
    const password = 'r5zjxp8vmqrb5tbdodjfp';
    cy.visit('/signup')
      .location('pathname')
      .should('include', '/signup');

    cy.get('[data-cy="email"]').type(userName);
    cy.get('[data-cy="password"]').type(password);
    cy.get('[data-cy="signupBtn"]')
      .should('have.text', 'Sign Up')
      .click()
      .location('pathname')
      .should('eq', '/');

    cy.get('[data-cy="rightMenu"] .nav-link')
      .eq(0)
      .should('have.text', `Welcome ${userName}`);

    cy.get('[data-cy="rightMenu"] .nav-link')
      .eq(1)
      .should('have.text', 'logout')
      .click()
      .should('not.be.visible')
      .location('pathname')
      .should('eq', '/login');

    cy.get('[data-cy="email"]').type(userName);
    cy.get('[data-cy="password"]').type(password);
    cy.get('[data-cy="loginBtn"]')
      .should('have.text', 'Login')
      .click()
      .location('pathname')
      .should('eq', '/');
  });

  it('Login to Non-Existent Account', () => {
    cy.visit('/login')
      .location('pathname')
      .should('eq', '/login');

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

    cy.get('[data-cy="email"]').type(bogusUserName);
    cy.get('[data-cy="password"]').type(bogusPassword);
    cy.get('[data-cy="loginBtn"]')
      .should('have.text', 'Login')
      .click();

    cy.get('[data-cy="loginErrorMsg"]').should('have.text', 'Invalid Login');
  });

  describe('Login Form Validation', () => {
    before(() => {
      cy.visit('/login');
    });

    it('Email Validation', () => {
      cy.get('[data-cy="email"]')
        .type('1')
        .get('[data-cy="emailValidation"]')
        .should('contain', 'Must be an email')
        .should('be.visible')
        .get('[data-cy="loginBtn"')
        .should('be.disabled');

      cy.get('[data-cy="email"]')
        .clear()
        .get('[data-cy="emailValidation"]')
        .should('contain', 'Email is required')
        .should('be.visible')
        .get('[data-cy="loginBtn"]')
        .should('be.disabled');

      cy.get('[data-cy="email"]')
        .type('123@foo.com')
        .get('[data-cy="emailValidation"]')
        .should('not.be.visible')
        .get('[data-cy="loginBtn"]')
        .should('be.disabled');
    });

    it('Password Validation', () => {
      cy.get('[data-cy="password"]')
      .type('1')
      .get('[data-cy="passwordValidation"]')
      .should('contain', 'Password must be at least 6 characters long')
      .should('be.visible')
      .get('[data-cy="loginBtn"]')
      .should('be.disabled');

    cy.get('[data-cy="password"]')
      .clear()
      .get('[data-cy="passwordValidation"]')
      .should('contain', 'Password is required')
      .should('be.visible')
      .get('[data-cy="loginBtn"]')
      .should('be.disabled');

      cy.get('[data-cy="password"]')
      .type('123456')
      .get('[data-cy="passwordValidation"]')
      .should('not.be.visible')
      .get('[data-cy="loginBtn"]')
      .should('not.be.disabled');
    });
  });

  describe('Signup Form Validation', () => {
    before(() => {
      cy.visit('/signup');
    });

    it('Email Validation', () => {
      cy.get('[data-cy="email"]')
        .type('1')
        .get('[data-cy="emailValidation"]')
        .should('contain', 'Must be an email')
        .should('be.visible')
        .get('[data-cy="signupBtn"')
        .should('be.disabled');

      cy.get('[data-cy="email"]')
        .clear()
        .get('[data-cy="emailValidation"]')
        .should('contain', 'Email is required')
        .should('be.visible')
        .get('[data-cy="signupBtn"]')
        .should('be.disabled');

      cy.get('[data-cy="email"]')
        .type('123@foo.com')
        .get('[data-cy="emailValidation"]')
        .should('not.be.visible')
        .get('[data-cy="signupBtn"]')
        .should('be.disabled');
    });

    it('Password Validation', () => {
      cy.get('[data-cy="password"]')
        .type('1')
        .get('[data-cy="passwordValidation"]')
        .should('contain', 'Password must be at least 6 characters long')
        .should('be.visible')
        .get('[data-cy="signupBtn"]')
        .should('be.disabled');

      cy.get('[data-cy="password"]')
        .clear()
        .get('[data-cy="passwordValidation"]')
        .should('contain', 'Password is required')
        .should('be.visible')
        .get('[data-cy="signupBtn"]')
        .should('be.disabled');

        cy.get('[data-cy="password"]')
        .type('123456')
        .get('[data-cy="passwordValidation"]')
        .should('not.be.visible')
        .get('[data-cy="signupBtn"]')
        .should('not.be.disabled');
    });
  });
});
