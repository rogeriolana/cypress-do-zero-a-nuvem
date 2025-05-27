describe('Central de atendimento ao cliente TAT', () => {
 
  beforeEach(() => {
    cy.visit('./src/index.html');
  })
  
  it('Verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')

  })

  it('Preenche os campos obrigatórios e envia o formulário', () => {
    const longText = 'Teste de preenchimento do formulário'.repeat(20)
    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('rogeriolana9@gmail.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.get('button[type="submit"]').click()
    cy.get('.button').click()
    
    cy.get('.success').should('be.visible') 
    
})
})