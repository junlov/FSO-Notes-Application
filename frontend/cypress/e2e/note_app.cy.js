/* eslint-disable no-undef */
describe('Note app', () => {
  describe('Homepage Landing', () => {
    it('front page can be opened', () => {
      cy.visit('')
      cy.contains('Notes')
      // cy.contains('Browser can execute only JavaScript')
    })

    it('login form can be opened', () => {
      cy.visit('')
      cy.get('#login-button1').click()
    })
  })

  describe('User Journey', () => {
    beforeEach(() => {
      cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
      const user = {
        name: 'James Gunn',
        username: 'Jamestest',
        password: 'Jamestest222',
      }
      cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
      cy.visit('')
    })

    it('user can login', function () {
      cy.contains('Log in').click()
      cy.get('#username').type('Jamestest')
      cy.get('#password').type('Jamestest222')
      cy.get('#login-button').click()

      cy.contains('James Gunn logged in')
    })

    it('login fails with wrong password', function () {
      cy.contains('Log in').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong Credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'James Gunn logged in')
    })

    describe('when logged in', function () {
      beforeEach(function () {
        cy.login({ username: 'Jamestest', password: 'Jamestest222' })
      })

      it('a new note can be created', function () {
        cy.contains('new note').click()
        cy.get('input').type('a note created by cypress')
        cy.contains('save').click()
        cy.contains('a note created by cypress')
      })

      describe('and several notes exist', function () {
        beforeEach(function () {
          cy.createNote({ content: 'first note', important: false })
          cy.createNote({ content: 'second note', important: false })
          cy.createNote({ content: 'third note', important: false })
        })

        it('one of those can be made important', function () {
          cy.contains('second note').parent().find('button').as('theButton')
          cy.get('@theButton').click()
          cy.get('@theButton').should('contain', 'make not important')
        })
      })
    })
  })
})
