describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset/')
        const user = {
            name: 'Annina',
            username: 'anni',
            password: 'jaakko'
          }
          cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
      cy.get('#form').should('be.visible')
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.contains('login').click()
            cy.get('#user').type('anni')
            cy.get('#pass').type('jaakko')
            cy.get('#login-button').click()
        
            cy.contains('Annina logged in')
        })
    
        it('fails with wrong credentials', function() {
            cy.contains('login').click()
            cy.get('#user').type('mluukkai')
            cy.get('#pass').type('salainen')
            cy.get('#login-button').click()
        
            cy.contains('wrong username or password')
        })
      })
      describe('Login', function() {
        beforeEach(function() {
            cy.request('POST', 'http://localhost:3001/api/login', {
                username: 'anni', password: 'jaakko'
              }).then(response => {
                localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
                cy.visit('http://localhost:3000')
              })
        })
        it('a new blog can be created', function() {
          cy.contains('create').click()
          cy.get('#title').type('Cypress')
          cy.get('#author').type('Cypress')
          cy.get('#url').type('cypress.fi')
          cy.get('.submit').click()
          cy.get("#blogs").contains('Cypress')
        })
        it('a created blog can be liked', function() {
            cy.contains('create').click()
            cy.get('#title').type('Cypress')
            cy.get('#author').type('Cypress')
            cy.get('#url').type('cypress.fi')
            cy.get('.submit').click()
            cy.get('#view').click()
            cy.get("#like").click()
            cy.reload()
            cy.get('#view').click()
            cy.get("#numLikes").contains('1')
          })
          it('a created blog can be deleted', function() {
            cy.contains('create').click()
            cy.get('#title').type('Cypress')
            cy.get('#author').type('Cypress')
            cy.get('#url').type('cypress.fi')
            cy.get('.submit').click()
            cy.get('#view').click()
            cy.reload()
            cy.get('#view').click()
            cy.get("#delete").click()
            cy.get('html').should('not.contain', '.blogInfo')
          })
    })

    describe('Adding blogs', function() {
        beforeEach(function () {
            cy.createBlog(
                {
              title: 'another blog',
              author: 'Jorma',
              url: 'yle.fi',
              likes: '34' 
            },
            {
                title: 'TurboBlogi',
                author: 'Jape',
                url: 'hs.fi',
                likes: '3' 
              },
              {
                title: 'ParasBlogi',
                author: 'Jokke',
                url: 'lahti.fi',
                likes: '4' 
              }
            )
          })
          it('has blogs', function() {
              cy.contains('ParasBlogi')
          })
        })
  })
