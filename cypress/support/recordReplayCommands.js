export function recordReplayCommands(dataFile, delay) {
  const xhrData = [];

  after(() => {
    if (Cypress.env('RECORD')) {
      const path = `./cypress/fixtures/${dataFile}.json`;
      cy.writeFile(path, xhrData);
    }
  });

  before(() => {
    cy.server({
      onRequest: request => {
        console.log('onRequest', request);
        request.failOnStatusCode = false;
      },
      onAbort: response => {
        console.log('onAbort', response);
      },
      onResponse: response => {
        console.log('onResponse', response);
        if (Cypress.env('RECORD')) {
          if (response.url.indexOf('sockjs-node') === -1) {
            const data = {
              url: response.url,
              method: response.method,
              data: response.responseBody,
              status: response.status,
              alias: '',
            };

            console.log('data', data);
            xhrData.push(data);
          }
        }
      },
    });

    if (Cypress.env('RECORD')) {
      cy.route({
        method: 'GET',
        url: '*',
      });
      cy.route({
        method: 'PUT',
        url: '*',
      });
      cy.route({
        method: 'PATCH',
        url: '*',
      });
      cy.route({
        method: 'POST',
        url: '*',
      });
      cy.route({
        method: 'DELETE',
        url: '*',
      });
    }

    if (!Cypress.env('RECORD')) {
      cy.route({
        method: 'GET',
        url: '/user/identity',
        response: {
          createdAt: 1551635741882,
          updatedAt: 1551635741882,
          id: 1,
          email: 'foo@foo.com',
        },
      }).as('identity');

      cy.fixture(dataFile).then(data => {
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          cy.route({
            method: element.method,
            url: element.url,
            response: element.data,
            delay: delay,
            status: element.status,
          }).as(element.alias);
        }
      });
    }
  });
}
