describe('template spec', () => {
    beforeEach(() => {
      cy.request('POST', 'http://localhost:5001/auth/login', {
        email: 'doesntexist@test.com',
        password: 'hackme123',
      })
    });
  
    it('visits dashboard', () => {
      cy.visit('http://localhost:5173/dashboard');
    });
      it('displays "no articles found" message when no articles found', () => {
        cy.intercept('GET', '/api/articles*', { articles: [] }).as('getEmptyArticles');
    
        // cy.reload(); // Reload the page to trigger the request again
        // Wait for the empty response
        cy.wait('@getEmptyArticles');
    
        // Check for the "no articles found" message
        cy.contains('Sorry').should('be.visible');
      });
  });
  