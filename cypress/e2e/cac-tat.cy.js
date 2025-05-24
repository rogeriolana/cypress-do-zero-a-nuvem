describe('Central de atendimento ao cliente TAT', () => {
  it('Verifica o titulo da aplicação', () => {
    cy.visit('./src/index.html')

    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')

   

  })
})