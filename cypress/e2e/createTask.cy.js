// Set the number of tasks to be added to the list. The maximum capacity is currently 8
//Test that tasks are added to the todo list when user input is valid

const taskCount = 7;
const emptyTask = '{enter}'
const smallTask = '&'
const bigTask = 'This Is a Big Task! '
const checkbox = ('input[type="checkbox"]')
const incompleteLabel = 'Incomplete'

describe('Create task', () => {
  it('User can access the app and create a new task', () => {
    cy.visit('https://domo-qa-recruitment.netlify.app/')
    for(let i=0; i<=taskCount; i++) {  
    //Task text based on position in list
    var todoText = 'This is To-Do item '+ i.toString()
    //Input field dynamic class name
    var task = '.todo-item-'+i.toString()+'>[type="text"]' 
    //Click button to create a task
    cy.get('.add-button').click()
    //Get the task from end of list
    cy.get('li').last().as('newTask')
    cy.get(task)
    .click()
    //Enter task
    .type(todoText)
    .type('{enter}');
    cy.get(task)
    //Check that task contains the text submitted
    .should('have.value', todoText)
    //Check new item is incomplete
    cy.get('@newTask')
    .should('have.attr', 'title', incompleteLabel)
    .find(checkbox)
    .should('not.be.checked')
    ;
    //Check list length to confirm all created tasks exist
    cy.get('ul>li')
    .its('length')
    .should('eq',i+1)
    
  }
  })

  it('User can create a task which includes an emoji', () => {

    cy.visit('https://domo-qa-recruitment.netlify.app/')
      for(let i=0; i<=taskCount; i++) {  
      //Task text based on position in list
      var todoText = 'This is To-Do item '+ i.toString()+'🤩'
      //Input field dynamic class name
      var task = '.todo-item-'+i.toString()+'>[type="text"]' 
      //Click button to create a task
      cy.get('.add-button').click()
      //Add text to the task
      cy.get('li').last().as('newTask')
      .click()
      .type(todoText)
      .type('{enter}');
      //Check that the task contains the submitted text and emoji
      cy.get(task)
      .should('have.value', todoText)
      //Check new item is incomplete
    cy.get('@newTask')
    .should('have.attr', 'title', incompleteLabel)
    .find(checkbox)
    .should('not.be.checked');      
      //Check list length to confirm all created tasks exist
      cy.get('ul>li')
      .its('length')
      .should('eq',i+1)
      
    }
  })


  it('User is unable to create an empty task', () => {

    cy.visit('https://domo-qa-recruitment.netlify.app/')
      for(let i=0; i<=taskCount; i++) {  
      //Dynamic class name
      const task = '.todo-item-'+i.toString()+'>[type="text"]' 
      //Click button to create a task
      cy.get('.add-button').click()
      //Create a task without any data
      cy.get('li').last()
      .click()
      .type(emptyTask)
      cy.get('.add-button').click()
      //Check that item [0] does not exist
      cy.get('ul>li')
      cy.get(task)
      .should('not.exist')
    }
  })
 
  //There is no max char value set.
  //This test can be updated if min task length is implemented

  it('User is unable to create a task below min value', () => {

    cy.visit('https://domo-qa-recruitment.netlify.app/')
      for(let i=0; i<=taskCount; i++) {  
      //Dynamic class name
      const task = '.todo-item-'+i.toString()+'>[type="text"]' 
      //Click button to create a task
      cy.get('.add-button').click()
      //Create a task without any data
      cy.get('li').last()
      .click()
      .type(smallTask)
      cy.get('.add-button').click()
      //Check that item [0] does not exist
      cy.get('ul>li')
      cy.get(task)
      .should('not.exist')
    }
  })


  //There is no max char value set.
  //This test can be updated if a max is implemented
  it('User cannot exceed max char value', () => {

    cy.visit('https://domo-qa-recruitment.netlify.app/')
      for(let i=0; i<=taskCount; i++) {  
      //Dynamic class name
      var task = '.todo-item-'+i.toString()+'>[type="text"]'
      //Click button to create a task
      cy.get('.add-button').click()
      //Create a which exceeds the acceptable character count
      //As there is no maximum a while loop is used to repeat input
      while(i<5) {
        cy.get('li').last()
        .click()
        .type(bigTask)
        i++
      }
      
      //Check that item [0] does not exist
      cy.get('ul>li')
      cy.get(task)
      .should('not.exist')
    }
  })

// end of test for Create task feature  
})