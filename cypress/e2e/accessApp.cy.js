const firstItem = '.todo-item-0>[type="text"]'
const placeHolder = 'Enter todo...'
const addBtn = ('.add-button')
const deleteIcon = ('span[class="delete"]')
const checkbox = ('input[type="checkbox"]')
const list = ('ul>li')
const h1Colour =('rgba(33, 53, 71, 0.87)')
const btnHoverClr = ('rgb(116, 123, 255))')


//Check that the elements are displayed as expected when the app is first accessed

describe('View ToDo app', () => {
  it('The app loads correctly', () => {
    cy.visit('https://domo-qa-recruitment.netlify.app/')
    //Check page heading is displayed
    cy.get('h1')
    .should('exist')
    .contains('DOMO Todos')
    //Check that the add button is displayed
    cy.get('.add-button')
    .should('exist')
    .contains('+')
    //Check that the list body is present
    cy.get('ul')
    .should('exist')
    cy.get('.add-button').click()
    //check that a new item contains the checkbox, delete icon and placeholder text
    cy.get(list)   
    .find(checkbox)
    .should('exist')
    cy.get(list)
    .find(deleteIcon)
    .should('exist')
    cy.get(firstItem)
    .should('have.attr', 'placeholder', placeHolder)
  })

  })

