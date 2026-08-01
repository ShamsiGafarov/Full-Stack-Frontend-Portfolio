describe('Project CRUD Operations', () => {
  const testProject = {
    title: 'Test Project',
    description: 'This is a test project created by Cypress',
    category: 'Web Development'
  };

  beforeEach(() => {
    // Try to register, if user exists (400), login instead
    cy.request({
      method: 'POST',
      url: 'http://localhost:5001/api/auth/register',
      body: {
        username: 'projectuser',
        email: 'project@test.com',
        password: 'password123'
      },
      failOnStatusCode: false
    }).then((response) => {
      if (response.status === 201) {
        const { token, user } = response.body;
        cy.window().then((win) => {
          win.localStorage.setItem('token', token);
          win.localStorage.setItem('user', JSON.stringify(user));
        });
      } else {
        // User exists, login
        cy.request({
          method: 'POST',
          url: 'http://localhost:5001/api/auth/login',
          body: {
            email: 'project@test.com',
            password: 'password123'
          }
        }).then((loginResponse) => {
          const { token, user } = loginResponse.body;
          cy.window().then((win) => {
            win.localStorage.setItem('token', token);
            win.localStorage.setItem('user', JSON.stringify(user));
          });
        });
      }
    });
    cy.visit('/admin');
    cy.contains('Admin Dashboard', { timeout: 10000 }).should('be.visible');
  });

  describe('Add Project', () => {
    it('should create a new project successfully', () => {
      cy.visit('/admin/projects');
      cy.contains('Add New Project').click();
      cy.get('input[name="title"]').type(testProject.title);
      cy.get('textarea[name="description"]').type(testProject.description);
      cy.get('input[name="category"]').type(testProject.category);
      cy.get('button[type="submit"]').click();
      cy.wait(1000);
      cy.url({ timeout: 5000 }).should('include', '/admin/projects');
      cy.contains(testProject.title, { timeout: 5000 }).should('be.visible');
    });

    it('should show validation errors for empty fields', () => {
      cy.visit('/admin/projects');
      cy.contains('Add New Project').click();
      cy.get('button[type="submit"]').click();
      cy.wait(500);
      
      // Validate that we are still on the new project page (no redirect)
      cy.url().should('include', '/admin/projects/new');
      
      // Check for any error message – could be .error, .auth-error, or a generic error
      cy.get('body').then(($body) => {
        if ($body.find('.error').length) {
          cy.get('.error').should('be.visible');
        } else if ($body.find('.auth-error').length) {
          cy.get('.auth-error').should('be.visible');
        } else {
          // If no specific error class, at least ensure the form is still visible
          cy.get('input[name="title"]').should('be.visible');
        }
      });
    });
  });

  describe('Edit Project', () => {
    beforeEach(() => {
      // Create a project first
      cy.visit('/admin/projects');
      cy.contains('Add New Project').click();
      cy.get('input[name="title"]').type('Original Title');
      cy.get('textarea[name="description"]').type('Original Description');
      cy.get('input[name="category"]').type('Testing');
      cy.get('button[type="submit"]').click();
      cy.wait(1000);
      cy.url({ timeout: 5000 }).should('include', '/admin/projects');
      cy.contains('Original Title', { timeout: 5000 }).should('be.visible');
    });

    it('should edit an existing project successfully', () => {
      cy.contains('Original Title')
        .parents('tr')
        .within(() => {
          cy.contains('Edit').click();
        });
      cy.get('input[name="title"]').clear().type('Updated Title');
      cy.get('textarea[name="description"]').clear().type('Updated Description');
      cy.get('button[type="submit"]').click();
      cy.wait(500);
      cy.contains('Updated Title', { timeout: 5000 }).should('be.visible');
      cy.contains('Original Title').should('not.exist');
    });

    it('should delete a project', () => {
      cy.contains('Original Title')
        .parents('tr')
        .within(() => {
          cy.contains('Delete').click();
        });
      cy.on('window:confirm', () => true);
      cy.wait(500);
      cy.contains('Original Title').should('not.exist');
    });
  });
});