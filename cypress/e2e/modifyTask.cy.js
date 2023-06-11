//Edit task
//Test scenario includes modifying text and changing status

// Set the number of tasks to be added to the list. 
//The maximum capacity is currently 8 tasks
const taskCount = 3;
//Randomly generate a value < task count
const randomVal = Math.floor(Math.random()*(taskCount-1)) 
const checkbox = ('input[type="checkbox"]')
const list = ('ul>li')
const firstItem = '.todo-item-0> input:nth-child(1)'
const modifiedTask = 'This task has been modified'

//Add items to list
beforeEach(() => {
  cy.visit('https://domo-qa-recruitment.netlify.app/')
      for(let i=1; i<=taskCount; i++) {  
      //Variable user input based on task position
      var todoText = 'This is To-Do item '+ i.toString() 
      //Click button to create a task
      cy.get('.add-button').click()
      //Add text to the task
      cy.get('li').last().as('newToDo')
      .click()
      .type(todoText + '{enter}')
    }
})

//Edit a task
describe('Edit tasks', () => {
  it('User can edit a task', () => {
  //Select first task and check it is incomplete
  cy.get(list)
  .first().as('editTask')
  .find(checkbox)
  .should('not.be.checked')
  //Clear the task data
  cy.get(firstItem)
  .click()
  cy.focused().clear()
  //verify that the input field is empty
  cy.get(firstItem)
  .should('have.value','')
  //Enter new task data
  .click()
  .type(modifiedTask)
  .type('{enter}');
  //Check that data has been replaced with new task data
  cy.get(firstItem)
  .should('have.value', modifiedTask)
  })

  //Test that checkbox is disabled for an empty/ invalid task
  it('User cannot mark an invalid task as complete', () => {
    //Select the first item and clear the task
    cy.get(firstItem)
    .click()
    cy.focused()
    .clear()
    //verify that the input field is empty
    cy.get(firstItem)
    .should('have.value','')
    //Check that the checkbox is disabled for the cleared task
    cy.get(list)
    .first()
    .find(checkbox)
    .should('be.disabled')

   }
 
 )


})