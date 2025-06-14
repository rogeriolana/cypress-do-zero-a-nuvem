describe('Central de atendimento ao cliente TAT', () => {
 
  beforeEach(() => {
    cy.visit('./src/index.html');
  })
  
  it('Verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')

  })

  it('Preenche os campos obrigatórios e envia o formulário', () => {
    cy.clock()
    const longText = 'Teste de preenchimento do formulário'.repeat(20)
    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('rogeriolana9@gmail.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.get('button[type="submit"]').click()
    cy.get('.button').click()
    
    cy.get('.success').should('be.visible') 

    cy.tick(3000)
    cy.get('.success').should('not.be.visible') 
    
})

it('Exibe mensagem de erro ao submeter o formulario em email com formatação invalida', () => {
  cy.clock()
    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('rogeriolana9@gmail,com')
    cy.get('#open-text-area').type('Teste ')
    cy.get('button[type="submit"]').click()

  
    cy.get('.error').should('be.visible') 

     cy.tick(3000)
    cy.get('.success').should('not.be.visible') 

  
});

it('Campo telefone continua vazio quando preenchido com valor nao-numerico', () => 
  {
    cy.get('#phone')
      .type('abcdefghij')
      .should('have.value', '')
      
  
});

it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
  cy.clock()  
     cy.get('#firstName').type('João')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('rogeriolana9@gmail.com')
    cy.get('#open-text-area').type('Teste ')
    cy.get('#phone-checkbox').click()
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
    cy.tick(3000)
    cy.get('.error').should('not.be.visible') 

})

it('Preenche e limpa os campos de nome,sobrenome ,email e telefone', () => {
   
  cy.get('#firstName')
      .type('João')
      .should('have.value', 'João')
      .clear()
      .should('have.value', '')

    cy.get('#lastName')
      .type('Silva')
      .should('have.value', 'Silva')
      .clear()
      .should('have.value', '')

    cy.get('#email')
      .type('rogeriolana9@gmail.com')
      .should('have.value', 'rogeriolana9@gmail.com')
      .clear()
      .should('have.value', '') 

    cy.get('#phone')
      .type('1234567890')
      .should('have.value', '1234567890')
      .clear()
      .should('have.value', '') 
  
});

it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
  cy.clock()
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')

    cy.tick(3000)
    cy.get('.error').should('not.be.visible') 

})

it('Envia o formulário com sucesso usando um comando customizado', () => {

  cy.clock()
  const data ={
    firstName: 'João',
    lastName: 'Silva',
    email: 'rogeriolana9@gmail.com',
    text: 'Teste de envio com comando customizado'
  }

    cy.fillMandatoryFieldsAndSubmit(data)
    

    cy.get('.success').should('be.visible')
    cy.tick(3000)
    cy.get('.success').should('not.be.visible') 

  })

  it('Seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('Seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('Seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('Marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  })

 it('Marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(($radio) => {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
  })

  it('Marca ambos os checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should((input) => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })
  
  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('./cypress/fixtures/example.json', { action:'drag-drop' })
      .should((input) => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })
  
  it('seletciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('#file-upload')
      .selectFile('@sampleFile')
      .should((input) => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('Verificaque a politica de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('#privacy a')
      .should('have.attr', 'target', '_blank')
      .invoke('removeAttr', 'target')
      .click()

    cy.get('#title').should('be.visible')
    
     
  })
  // testando Lodash  rodando 5 vezes o teste abaixo

  Cypress._.times(5, () => {
   it('Acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()

    cy.get('#title')
      .should('be.visible')
      
      })  

  })
  it('Exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')

    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')

  })  
  it('preenche a area de texto usando o comando invoke', () => {
    const longText = 'Teste de preenchimento do formulário'.repeat(20)
    cy.get('#open-text-area')
      .invoke('val', longText)
      .should('have.value', longText)
  })
  it('faz uma requisição HTTP', () => {
    cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
      .as('getRequest')
      .its('status')
      .should('be.equal', 200)  
      cy.get('@getRequest')
      .its('statusText')
      .should('be.equal', 'OK')
      cy.get('@getRequest')
      .its('body')
      .should('include', 'CAC TAT')
      

      })
      it('Encontra o gato escondido', () => {
        cy.get('#cat')
          .invoke('show')
          .should('be.visible')
          cy.get('#title')
          .invoke('text' , 'CAT TAT')
          cy.get('#subtitle')
          .invoke('text', 'Eu Amo Gatos')
      })  
  })


  

 

