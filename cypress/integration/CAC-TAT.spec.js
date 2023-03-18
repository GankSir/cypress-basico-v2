// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    const THREE_SECONDS_IN_MS = 3000
    //antes de
    beforeEach(() => {
        cy.visit("./src/index.html")
    })
    it('Verificar o título da Aplicação', function () {

        cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT")
    });

    it('Preencha os campos obrigatórios e envia o formulário', function () {
        const longText = 'Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste'

        cy.clock()

        cy.get('#firstName').type('Bruno')
        cy.get('#lastName').type('Sales')
        cy.get('#email').type('sirgank13@gmail.com')
        cy.get('#phone').type(31991442623)
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.success').should('not.be.visible')



    })

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {

        cy.clock()

        cy.get('#firstName').type('Bruno')
        cy.get('#lastName').type('Sales')
        cy.get('#email').type('sirgank13@gmail,com')
        cy.get('#phone').type(31991442623)
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')


    })

    it('Campo telefone continua vazio quando preenchido com valor não númerico', function () {
        cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', '')
    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio', function () {

        cy.clock()

        cy.get('#firstName').type('Bruno')
        cy.get('#lastName').type('Sales')
        cy.get('#email').type('sirgank13@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()


        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')


    })

    it('Preencha e limpe os campos nome, sobrenome email e telefone', function () {
        cy.get('#firstName').type('Bruno').should('have.value', 'Bruno').clear().should('have.value', '')
        cy.get('#lastName').type('Sales').should('have.value', 'Sales').clear().should('have.value', '')
        cy.get('#email').type('sirgank13@gmail.com').should('have.value', 'sirgank13@gmail.com').clear().should('have.value', '')
        cy.get('#phone').type(31991442623).should('have.value', '31991442623').clear().should('have.value', '')

    })

    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {

        cy.clock()

        cy.get('#email-checkbox').click()
        cy.get('#phone-checkbox').click()

        cy.get('.button').click()


        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.error').should('not.be.visible')


    })

    it('Envia o formulário com sucesso usando um comando customizado', function () {

        cy.clock()

        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.success').should('not.be.visible')


    })

    it('Seleciona um produto (YouTube) por seu texto ', function () {

        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('Seleciona um produto (Mentoria) por seu valor ', function () {

        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('Seleciona um produto (Blog) por seu indice ', function () {

        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('Marca o tipo de atendimento "Feedback" ', function () {

        cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')

    })

    it('Marca cada tipo de atendimento', function () {

        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })

    })

    it('Marca checkboxes, depois desmarca o último', function () {
        cy.get('input[type=checkbox]')
            .check()
            .should('be.checked')
            .last()
            .uncheck().should('not.be.checked')

    })

    it('Exibir mensagem de erro quando o telefone se tornar obrigatório mas não é preenchido antes do envio (checkBox)', function () {

        cy.clock()

        cy.get('#firstName').type('Bruno')
        cy.get('#lastName').type('Sales')
        cy.get('#email').type('sirgank13@gmail.com')
        cy.get('#phone-checkbox').check().should('be.checked')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

        

        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')

    })

    it('Seleciona um arquivo da pasta fixtures', function () {

        cy.get('input[type="file"]').click()
            .should('not.have.value') // Não tem valor
            .selectFile('./cypress/fixtures/example.json')
            .should(function ($input) {
                console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')

            })
    })

    it('Selecione um arquivo usando drag-and-drop', function () {

        cy.get('input[type="file"]')
            .should('not.have.value')                       //drag-drop arrasta o arquivo 
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')

            })
    })
    it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {

        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')

            })
    })

    it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')

    })

    it('Acessa a página da política de privacidade removendo o target e então clicando no link', function () {

        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        cy.contains('Não salvamos dados submetidos no formulário da aplicação CAC TAT.')
            .should('be.visible')

    })






});