Cypress.Commands.add('visitSecretPage', (pageUrl) => {
  cy.visit(`/${pageUrl}`, { failOnStatusCode: false});
});