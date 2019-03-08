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

  before(() => {
    cy.visit('/login');
    cy.get('#email').type('foo@foo.com');
    cy.get('#password').type('123456');
    cy.get('.btn-primary')
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

    cy.get('.form-control').type(todoText);

    cy.get('.btn')
      .should('contain', 'Add')
      .click();

    cy.wait('@addtodo');
  });

  describe.only('Delete Todo', () => {
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

      cy.get('.row.todo')
      .first()
      .get('[data-cy="trash-icon"] svg[data-icon="trash-alt"]')
      .click();

      cy.get('.row.todo').should('exist');

      cy.route({
        method: 'DELETE',
        url: '/todo/*',
        response: 'OK',
      }).as('delete');

      cy.get('.row.todo')
      .first()
      .get('[data-cy="trash-icon"] svg[data-icon="trash-alt"]')
      .click();

      cy.wait('@delete');

      cy.get('.row.todo').should('not.exist');
    });
  });

  describe('Complete Todo', () => {
    it('Complete Item', () => {
      const firstRow = cy.get('.row.todo').first();

      cy.route({
        method: 'PATCH',
        url: '/todo/*',
        response: 'OK',
      }).as('todo-complete');

      // Toggle to Completed
      firstRow
        .get('[data-cy="check-icon"] svg[data-icon="square"]')
        .and('be.visible')
        .click();

      cy.wait('@todo-complete');

      firstRow.get('[data-cy="check-icon"] svg[data-icon="check-square"]').and('be.visible');

      firstRow.get('[data-cy="check-icon"] svg[data-icon="square"]').and('not.be.visible');

      // Toggle to Uncompleted
      firstRow.get('[data-cy="check-icon"] svg[data-icon="check-square"]').click();

      cy.wait('@todo-complete');

      firstRow.get('[data-cy="check-icon"] svg[data-icon="square"]').and('be.visible');

      firstRow.get('[data-cy="check-icon"] svg[data-icon="check-square"]').and('not.be.visible');
    });
  });

  describe('Add Todo', () => {
    // recordReplayCommands('AddTodo', 0);
    it('Add', () => {
      const firstRow = cy.get('.row.todo').first();
      firstRow.find('[data-cy=todo-text]').should('contain', todoText);

      firstRow.get('[data-cy="check-icon"] svg[data-icon="square"]').and('be.visible');

      firstRow.get('[data-cy="check-icon"] svg[data-icon="check-square"]').and('not.be.visible');

      firstRow.get('[data-cy="trash-icon"] svg[data-icon="trash-alt"]').and('be.visible');

      cy.get('.lead').should('contain', "You've got 1 things to do");
    });

    it('MinLength Validation', () => {
      cy.get('.form-control')
        .type('1')
        .get('.alert')
        .should('contain', 'Item must be at least 3 characters');

      cy.get('.btn').should('be.disabled');

      cy.get('.form-control')
        .type('123')
        .get('.alert')
        .should('not.be.visible');

      cy.get('.btn').should('not.be.disabled');
    });

    it('Required Validation', () => {
      cy.get('.form-control')
        .type('1')
        .clear()
        .get('.alert')
        .should('contain', 'Item is required.');

      cy.get('.btn').should('be.disabled');

      cy.get('.form-control')
        .type('1')
        .get('.alert')
        .should('contain', 'Item must be at least 3 characters');

      cy.get('.btn').should('be.disabled');

      cy.get('.form-control')
        .clear()
        .type('123')
        .get('alert')
        .should('not.be.visible');

      cy.get('.btn').should('not.be.disabled');
    });
  });
});
