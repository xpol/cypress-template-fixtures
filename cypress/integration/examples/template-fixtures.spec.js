/// <reference types="cypress" />
context('Template fixtures', () => {
    it('cy.fixture() - load a fixture', () => {
        cy.fixture('example.json').then(json => {
            expect(json.name).to.equal('Name from cypress.json env field')
            expect(json.title).to.equal('Title form cypress.env.json')
            expect(json.email).to.equal('variable.from.dotenv@example.com')
            expect(json.body).to.equal('Body from command line')
        })
    })

    it('cy.readFile() - read file contents', () => {
        cy.readFile('cypress/fixtures.out/example.json').then((json) => {
            expect(json.name).to.equal('Name from cypress.json env field')
            expect(json.title).to.equal('Title form cypress.env.json')
            expect(json.email).to.equal('variable.from.dotenv@example.com')
            expect(json.body).to.equal('Body from command line')
        })
    })

    it('cy.fixture() - load a fixture in nested directory', () => {
        cy.fixture('nested/nested/nested.json').then(json => {
            expect(json.name).to.equal('Name from cypress.json env field')
            expect(json.title).to.equal('Title form cypress.env.json')
            expect(json.email).to.equal('variable.from.dotenv@example.com')
            expect(json.body).to.equal('Body from command line')
        })
    })
})
