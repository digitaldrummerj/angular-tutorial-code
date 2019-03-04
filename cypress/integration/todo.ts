import { recordReplayCommands } from '../support/recordReplayCommands';

describe('Add Todo', () => {
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

  beforeEach(() => {
    cy.visit('/login');
    cy.get('#email').type('foo@foo.com');
    cy.get('#password').type('123456');
    cy.get('.btn-primary')
      .should('have.text', 'Login')
      .click();
    cy.location('pathname').should('eq', '/');
  });

  // recordReplayCommands('AddTodo', 0);
  it.only('Add Todo', () => {
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

    const firstRow = cy.get('.row.todo').first();
    firstRow.find('[data-cy=todo-text]').should('contain', todoText);

    cy.get('[data-cy="check-icon"] svg[data-icon="check-square"]')
      .and('not.be.visible');

      cy.get('[data-cy="trash-icon"] svg[data-icon="trash-alt"]')
      .and('be.visible');

    cy.get('.lead').should('contain', "You've got 1 things to do");
  });

  it('MinLength Validation', () => {
    cy.get('.form-control')
      .type('1')
      .get('.alert')
      .should('contain', 'Item must be at least 3 characters');

    cy.get('.form-control')
      .type('123')
      .get('.alert')
      .should('not.be.visible');
  });

  it('Required Validation', () => {
    cy.get('.form-control')
      .type('1')
      .clear()
      .get('.alert')
      .should('contain', 'Item is required.');

    cy.get('.form-control')
      .type('1')
      .get('.alert')
      .should('contain', 'Item must be at least 3 characters');

    cy.get('.form-control')
      .clear()
      .type('123')
      .get('alert')
      .should('not.be.visible');
  });
});
