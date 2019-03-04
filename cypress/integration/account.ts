import {recordReplayCommands } from '../support/recordReplayCommands';

describe('Navigation: Login and Create Account Pages', () => {
  it('Login to Signup', () => {
    cy.visit('login');
    cy.location('pathname').should('eq', '/login');

    cy.get('.btn-link')
      .should('have.text', 'create account')
      .click();

    cy.location('pathname').should('eq', '/signup');
  });

  it('Signup to Login', () => {
    cy.visit('signup');
    cy.location('pathname').should('eq', '/signup');

    cy.get('.btn-link')
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

    cy.get('#email').type(userName);
    cy.get('#password').type(password);
    cy.get('.btn-primary')
      .should('have.text', 'Sign Up')
      .click()
      .location('pathname').should('eq', '/');

    cy.get('.nav-item.nav-link').should('have.text', `Welcome ${userName}`);
    cy.get(':nth-child(2) > :nth-child(2) > .nav-link')
      .should('have.text', 'logout')
      .click()
      .should('not.be.visible')
      .location('pathname').should('eq', '/login');

    cy.get('#email').type(userName);
    cy.get('#password').type(password);
    cy.get('.btn-primary')
      .should('have.text', 'Login')
      .click()
      .location('pathname').should('eq', '/');
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

    cy.get('#email').type(bogusUserName);
    cy.get('#password').type(bogusPassword);
    cy.get('.btn-primary')
      .should('have.text', 'Login')
      .click();

    cy.get('.alert.alert-danger').should('have.text', 'Invalid Login');
  });
});
