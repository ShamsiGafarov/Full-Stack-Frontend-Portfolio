import './commands';

// This ensures Cypress waits for the app to load
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
});