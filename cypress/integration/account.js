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

    cy.server();

    cy.route({
      url: '/user',
      status: 200,
      method: 'POST',
      response: {
        "createdAt": 1552670656025,
        "updatedAt": 1552670656025,
        "id": 3,
        "email": userName
      }
    }).as('signup');

    cy.route({
      url: '/user/identity',
      status: 200,
      method: 'GET',
      response: {
        createdAt: 1551738475242,
        updatedAt: 1551738475242,
        id: 1,
        email: userName,
      },
    }).as('identity');

    cy.route({
      url: '/todo',
      method: 'GET',
      status: 200,
      response: []
    }).as('todo');

    cy.visit('/signup')
      .location('pathname')
      .should('include', '/signup');

    cy.get('[data-cy="email"]').type(userName);
    cy.get('[data-cy="password"]').type(password);
    cy.get('[data-cy="signupBtn"]')
      .should('have.text', 'Sign Up')
      .click()
      .wait('@signup')
      .wait('@identity')
      .wait('@todo')
      .location('pathname')
      .should('eq', '/');

    cy.get('[data-cy="rightMenu"] .nav-link')
      .eq(0)
      .should('have.text', `Welcome ${userName}`);

      cy.route({
        url: '/user/logout',
        method: 'GET',
        status: 200,
        response: 'Ok'
      }).as('logout');

    cy.get('[data-cy="rightMenu"] .nav-link')
      .eq(1)
      .should('have.text', 'logout')
      .click()
      .wait('@logout')
      .should('not.be.visible')
      .location('pathname')
      .should('eq', '/login');

      cy.route({
        url: '/user/login',
        status: 200,
        method: 'PUT',
        response: {
          createdAt: 1551738475242,
          updatedAt: 1551738475242,
          id: 1,
          email: userName,
        },
      }).as('login');



    cy.get('[data-cy="email"]').type(userName);
    cy.get('[data-cy="password"]').type(password);
    cy.get('[data-cy="loginBtn"]')
      .should('have.text', 'Login')
      .click()
      .wait('@login')
      .wait('@identity')
      .wait('@todo')
      .location('pathname')
      .should('eq', '/');
  });

  it('Login to Non-Existent Account', () => {
    cy.server();
    cy.route({
      url: '/user/login',
      method: 'PUT',
      status: 401,
      response: 'Forbidden'
    }).as('login-invalid');

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

    cy.wait('@login-invalid');

    cy.get('[data-cy="loginErrorMsg"]').should('have.text', 'Invalid Login');
  });
});

describe('Form Validation', () => {
  describe('Login Form Validation', () => {
    before(() => {
      cy.visit('/login');
    });

    it('Email Validation', () => {
      cy.get('[data-cy="email"]')
        .focus()
        .blur()
        .get('[data-cy="emailValidation"]')
        .should('contain', 'Email is required')
        .should('be.visible')
        .get('[data-cy="loginBtn"]')
        .should('be.disabled');

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
        .focus()
        .blur()
        .get('[data-cy="passwordValidation"]')
        .should('contain', 'Password is required')
        .should('be.visible')
        .get('[data-cy="loginBtn"]')
        .should('be.disabled');

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
        .focus()
        .blur()
        .get('[data-cy="emailValidation"]')
        .should('contain', 'Email is required')
        .should('be.visible')
        .get('[data-cy="signupBtn"]')
        .should('be.disabled');
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
        .focus()
        .blur()
        .get('[data-cy="passwordValidation"]')
        .should('contain', 'Password is required')
        .should('be.visible')
        .get('[data-cy="signupBtn"]')
        .should('be.disabled');
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
