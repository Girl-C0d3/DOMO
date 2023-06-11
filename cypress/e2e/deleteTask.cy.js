//Change value to adjust how many tasks to add to list
//Chooses how many tasks to mark as complete
const taskCount = 2; 
const randomVal = Math.floor(Math.random()*(taskCount-1)) 
const checkbox = ('input[type="checkbox"]')
const deleteIcon = ('span[class="delete"]')
const list = ('ul>li')
const firstItem = '.todo-item-0> input:nth-child(1)'


//Add items to list
beforeEach(() => {
  cy.visit('https://domo-qa-recruitment.netlify.app/')
      for(let i=1; i<=taskCount; i++) {  
      //Set constant to add task to list
      const todoText = 'This is To-Do item '+ i.toString() 
      //Click button to create a task
      cy.get('.add-button').click()
      //Add text to the task
      cy.get('li').last().as('newToDo')
      .click()
      .type(todoText)
    
    }
}
)


// Test delete task feature
describe('Delete a task', () => {
  it('User can delete an incomplete task', () => {
   //Confirm that items in list = taskCount constant
    cy.get(list)
    .its('length')
    .should('eq', taskCount)
     //Get the last task and check it is incomplete
    cy.get('li').last().as('deleteToDo')
    .find(checkbox)
    .should('not.be.checked')
    cy.get('@deleteToDo')
    //Click the delete button
    .find(deleteIcon)
    .click()
    //Confirm that the item has been removed from the list
    cy.get(list)
    .its('length')
    .should('eq', taskCount-1)

  })
  it('User can delete an complete task', () => {
    //Confirm that items in list = taskCount constant
     cy.get(list)
     .its('length')
     .should('eq', taskCount)
      //Get the last task and check it is incomplete
     cy.get('li').last().as('deleteToDo')
     .find(checkbox)
     .check()
     .should('be.checked')
     cy.get('@deleteToDo')
     //Click the delete button
     .find(deleteIcon)
     .click()
     //Confirm that the item has been removed from the list
     cy.get(list)
     .its('length')
     .should('eq', taskCount-1)
})

it('User can delete all items from ToDo list', () => {
  //Confirm that items in list = taskCount constant
   cy.get(list)
   .its('length')
   .should('eq', taskCount)
   for(let i=1; i<=taskCount; i++) {
      cy.get('li').last().as('deleteToDo')
      .find(deleteIcon)
      .click()
      //wait to allow for transition
       cy.wait(500);
      }
    
      //Confirm that all items have been deleted
    cy.get(list)
    .should('not.exist')
 })
})
