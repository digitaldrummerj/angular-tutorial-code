describe('404 error page', () => {
  it('route works', () => {
    cy.visit('/unknown')
      .location('pathname')
      .should('eq', `${Cypress.env('baseHref')}/unknown`);

      cy.get('[data-cy="works"]').should('contain', 'not-found works!');
  });
});
