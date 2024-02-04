describe('Login Test', () => {
    it('Visits the login page and logs in', () => {
      cy.visit('/api/auth/login') 
      cy.get('input[name=username]').type('user@example.com')
      cy.get('input[name=password]').type('password123')
      cy.get('button[type=submit]').click()
  
      cy.url().should('include', '/dashboard')
    })
  })
  