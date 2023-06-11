
describe( 'Accessibility testing', () => {
it('Passes accessibility tests', () => {
    // Visit the web page or perform necessary actions to navigate to the desired state
    cy.visit('https://domo-qa-recruitment.netlify.app/');
  
    // Run accessibility tests using Cypress-axe
    cy.injectAxe();
    cy.checkA11y();
  })
})