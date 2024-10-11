describe('SignUp', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/signup');
    });
  
    it('should display all sign-up inputs', () => {
      cy.get('input[placeholder="Enter your name"]').should('exist');
      cy.get('input[placeholder="Enter your age"]').should('exist');
      cy.get('input[placeholder="Enter your email address"]').should('exist');
      cy.get('input[placeholder="Enter your password"]').should('exist');
      cy.get('input[placeholder="Enter your new password again"]').should('exist');
      cy.get('input[type="checkbox"]').should('exist');
  
      cy.contains('button', 'Get started now').should('exist');
    });
  
    it('should show validation error for invalid email passwords', () => {
      cy.get('input[placeholder="Enter your email address"]').type('notemail');
      cy.get('input[placeholder="Enter your password"]').type('111');
      cy.get('input[placeholder="Enter your new password again"]').type('222');

      cy.contains('Invalid email address').should('be.visible');
      cy.contains('Password must be at least 8 characters long').should('be.visible');
    });
  
    it('should send form when all inputs are filled correctly', () => {
      cy.intercept('POST', 'http://localhost:5001/auth/signup', {
        statusCode: 200,
        body: { message: 'Success' },
      }).as('signupRequest');
  
      cy.get('input[placeholder="Enter your name"]').type('Stepan');
      cy.get('input[placeholder="Enter your age"]').type('12');
      cy.get('input[placeholder="Enter your email address"]').type('email@example.com');
      cy.get('input[placeholder="Enter your password"]').type('12345678');
      cy.get('input[placeholder="Enter your new password again"]').type('12345678');
      cy.get('input[type="checkbox"]').click({force: true});
  
      cy.get('button[type="submit"]').click();
  
      cy.wait('@signupRequest').its('response.statusCode').should('eq', 200);
    });
  
    it('should navigate to login page when Login link is clicked', () => {
      cy.contains('Login').click();
  
      cy.url().should('eq', 'http://localhost:5173/login');
    });
  
    it('should navigate to terms and policy page when clicked', () => {
      cy.contains('Terms and Policy.').click();
  
      cy.url().should('eq', 'http://localhost:5173/terms');
    });
  });
  