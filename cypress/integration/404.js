describe('404 error page', () => {
  beforeEach(() => {
    cy.visit('/unknown');
    cy.location('pathname').should('eq', '/unknown');
    // cy.injectAxe();
  });

  it('Has no detectable a11y violations on load', () => {
    // // Test the page at initial load
    cy.checkA11y();
  });

  it('route works', () => {
    cy.get('[data-cy="works"]').should('contain', 'not-found works!');
  });
});
