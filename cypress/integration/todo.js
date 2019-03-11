import { recordReplayCommands } from '../support/recordReplayCommands';

describe('Todo', () => {
  const todoText = `Todo Test Item ${Math.random()
    .toString(36)
    .substring(2, 15)}${Math.random()
    .toString(36)
    .substring(2, 15)}`;

  const addResponse = {
    createdAt: 1551735622935,
    updatedAt: 1551735622935,
    id: 6,
    item: todoText,
    completed: false,
    owner: 2,
  };

  describe('CRUD', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.get('[data-cy="email"]').type('foo@foo.com');
      cy.get('[data-cy="password"]').type('123456');
      cy.get('[data-cy="loginBtn"]')
        .should('have.text', 'Login')
        .click();

      cy.location('pathname').should('eq', '/');

      cy.server();

      cy.route({
        url: '/todo',
        status: 200,
        method: 'POST',
        response: addResponse,
      }).as('addtodo');

      cy.get('[data-cy="todoInput"]').type(todoText);

      cy.get('[data-cy="addBtn"]')
        .should('contain', 'Add')
        .click();

      cy.wait('@addtodo');
    });

    it('Delete Todo', () => {
      let count = 0;
      cy.on('window:confirm', str => {
        count += 1;

        switch (count) {
          case 1:
            expect(str).to.eq('Are you sure you want to delete?');
            console.log('test 1', count);
            // reject the confirmation
            return false;
          case 2:
            expect(str).to.eq('Are you sure you want to delete?');
            console.log('test 2', count);
            // accepts the confirmation
            return true;

            // using mocha's async done callback to finish
            // this test so we are guaranteed everything
            // got to this point okay without throwing an error
            done();
        }
      });

      cy.get(
        '[data-cy="todoItems"]:first [data-cy="trash-icon"] svg[data-icon="trash-alt"]'
      ).click();

      cy.get('[data-cy="todoItems"]').should('exist');

      cy.route({
        method: 'DELETE',
        url: '/todo/*',
        response: 'OK',
      }).as('delete');

      cy.get(
        '[data-cy="todoItems"]:first [data-cy="trash-icon"] svg[data-icon="trash-alt"]'
      ).click();

      cy.wait('@delete');

      cy.get('[data-cy="todoItems"]').should('not.exist');
    });

    it('Complete Item', () => {
      cy.route({
        method: 'PATCH',
        url: '/todo/*',
        response: 'OK',
      }).as('todo-complete');

      // Toggle to Completed
      cy.get('[data-cy="todoItems"]:first [data-cy="check-icon"] svg[data-icon="square"]')
        .and('be.visible')
        .click();

      cy.wait('@todo-complete');

      cy.get(
        '[data-cy="todoItems"]:first [data-cy="check-icon"] svg[data-icon="check-square"]'
      ).and('be.visible');

      cy.get('[data-cy="todoItems"]:first [data-cy="check-icon"] svg[data-icon="square"]').and(
        'not.be.visible'
      );

      // Toggle to Uncompleted
      cy.get(
        '[data-cy="todoItems"]:first [data-cy="check-icon"] svg[data-icon="check-square"]'
      ).click();

      cy.wait('@todo-complete');

      cy.get('[data-cy="todoItems"]:first [data-cy="check-icon"] svg[data-icon="square"]').and(
        'be.visible'
      );

      cy.get(
        '[data-cy="todoItems"]:first [data-cy="check-icon"] svg[data-icon="check-square"]'
      ).and('not.be.visible');
    });

    it('Add', () => {
      cy.get('[data-cy="todoItems"]:first [data-cy=todo-text]').should('contain', todoText);

      cy.get('[data-cy="todoItems"]:first [data-cy="check-icon"] svg[data-icon="square"]').and(
        'be.visible'
      );

      cy.get(
        '[data-cy="todoItems"]:first [data-cy="check-icon"] svg[data-icon="check-square"]'
      ).and('not.be.visible');

      cy.get('[data-cy="todoItems"]:first [data-cy="trash-icon"] svg[data-icon="trash-alt"]').and(
        'be.visible'
      );

      cy.get('.lead').should('contain', "You've got 1 things to do");
    });
  });

  describe.only('Add Todo Form Validation', () => {
    // recordReplayCommands('AddTodo', 0);
    before(() => {
      cy.visit('/login');
      cy.get('#email').type('foo@foo.com');
      cy.get('#password').type('123456');
      cy.get('[data-cy="loginBtn"]')
        .should('have.text', 'Login')
        .click();

      cy.location('pathname').should('eq', '/');
    });
    it('MinLength Validation', () => {
      cy.get('[data-cy="todoInput"]')
        .type('1')
        .get('[data-cy="formValidationError"]')
        .should('contain', 'Item must be at least 3 characters')
        .get('[data-cy="todoInput"]');

      cy.get('[data-cy="addBtn"]').should('be.disabled');

      cy.get('[data-cy="todoInput"]')
        .type('123')
        .get('[data-cy="formValidationError"]')
        .should('not.be.visible');

      cy.get('[data-cy="addBtn"]').should('not.be.disabled');
    });

    it('Required Validation', () => {
      cy.get('[data-cy="todoInput"]')
        .clear()
        .get('[data-cy="formValidationError"]')
        .should('contain', 'Item is required.')
        .get('[data-cy="addBtn"]')
        .should('be.disabled');

      cy.get('[data-cy="todoInput"]')
        .type('123')
        .get('[data-cy="formValidationError"]')
        .should('not.be.visible')
        .get('[data-cy="addBtn"]')
        .should('not.be.disabled');
    });
  });
});
