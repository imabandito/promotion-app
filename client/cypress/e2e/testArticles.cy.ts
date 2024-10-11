import 'cypress-intercept-formdata';

describe('Articles', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
    cy.get('input[placeholder="Enter your email address"]').type(
      'doesntexist@test.com'
    );
    cy.get('input[placeholder="Enter your password"]').type('hackme123');
    cy.get('button[type="submit"]').click();
  });

  it('should visit dashboard', () => {
    cy.visit('http://localhost:5173/');
  });

  it('should display "Sorry, no articles found" message when no articles found', () => {
    cy.intercept('GET', 'http://localhost:5001/articles*', { articles: [] }).as(
      'getEmptyArticles'
    );

    cy.wait('@getEmptyArticles');

    cy.contains('Sorry, no articles found').should('be.visible');
  });

  it('should display articles from response', () => {
    cy.intercept('GET', 'http://localhost:5001/articles*', {
      fixture: 'articles.json',
    }).as('getArticles');

    cy.wait('@getArticles');

    cy.contains('Article title').should('be.visible');
    cy.contains('Article title 2').should('be.visible');
  });

  it('should update the sorting when a sorting option is selected', () => {
    cy.intercept('GET', 'http://localhost:5001/articles*', {
      fixture: 'articles.json',
    }).as('getArticles');
    cy.intercept('GET', 'http://localhost:5001/articles/categories', {
      fixture: 'categories.json',
    }).as('getCategories');
    cy.wait('@getArticles');
    cy.wait('@getCategories');

    cy.contains('button', 'Ascending').click();
    cy.contains('li', 'Date').click();
    cy.url().should('include', 'sort=date');
    cy.contains('button', 'Date').should('exist');
  });

  it('should navigate to the Add Article page when Add Article button is clicked', () => {
    cy.contains('button', 'Add Article').click({ force: true });
    cy.url().should('include', '/addarticle');
  });

  it('should send request with input data from Add new article page', () => {
    cy.intercept('POST', 'http://localhost:5001/articles/new', (req) => {
      req.reply({
        statusCode: 200,
        body: { message: 'Success' },
      });
    }).as('newArticleRequest');

    cy.contains('button', 'Add Article').click({ force: true });

    cy.get('input[placeholder="Enter your title"]').type('new article title');
    cy.get('textarea[placeholder="Enter your text"]').type('new article text');
    cy.get('input[placeholder="Enter your title"]').click();
    cy.contains('button', 'Publish').click({ force: true });

    cy.wait('@newArticleRequest').interceptFormData((formData) => {
      console.log('formData', formData);

      expect(formData['title']).to.equal('new article title');
      expect(formData['text']).to.equal('new article text');
    });
  });
});
