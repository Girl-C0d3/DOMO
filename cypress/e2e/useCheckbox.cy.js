//Test that the checkbox is functioning correctly

const taskCount = 5; //Change value to adjust how many tasks to add to list
const randomVal = Math.floor(Math.random()*(taskCount-1)) //Chooses how many tasks to mark as complete
const checkbox = ('input[type="checkbox"]')
const list = ('ul>li')
const completeLabel = 'Done!'
const incompleteLabel = 'Incomplete'
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
  describe('Use Checkbox feature', () => {

 

//Test that an incomplete task can be marked as complete
    it('User can mark an incomplete task as complete', () => {
 
    //Select first item from the list
    cy.get('li').first().as('done')
    .find(checkbox)
    .should('not.be.checked')
    //Complete the task
    .check()
    //Check that the task is complete
    .should('be.checked')
    cy.get('@done')
    .should('have.attr', 'title');
   //Check that there is now one checked item in the list
    cy.get(list)
      .find(checkbox)
       .filter(':checked')
       .its('length')
       .should('eq',1) ;
    }
      )}
  )

  it('User can mark a complete task as incomplete', () => {

     //Select first item from the list and complete it
     cy.get('li').first().as('incomplete')
     .find(checkbox)
     .check()
     //Check that the task is complete
     .should('be.checked')
     cy.get('@incomplete')
     .should('have.attr', 'title', completeLabel);
     cy.get('@incomplete')
     .find(checkbox)
     .uncheck()
     //Check that the task has been marked as complete
     .should('not.be.checked')
     cy.get('@incomplete')
     .should('have.attr', 'title', incompleteLabel);
    //Check that there are no checked items in the list
     cy.get(list)
       .find(checkbox)
        .filter(':checked')
        .should("not.exist") 
       ;
     }
    )

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


  //End of test