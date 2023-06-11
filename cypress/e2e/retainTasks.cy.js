//Change value to adjust how many tasks to add to list
const taskCount =3; 
//Number of incomplete tasks 
const incomplete = (taskCount-1)
const list = ('ul>li')
const checkbox = ('input[type="checkbox"]')

//Add items to list
beforeEach(() => {
    cy.visit('https://domo-qa-recruitment.netlify.app/')
        for(let i=0; i<=taskCount; i++) {  
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


  describe('Retain task', () => {

    //Test ToDo list storage
        it('Tasks are retained when user leaves page', () => {
     
        //Complete first task
       cy.get(list)
       cy.get('li').first().as('done')
       .find(checkbox)
       .check();
       //Confirm 1 complete task
       cy.get(list)
        .find(checkbox)
        .filter(':checked')
        .its('length')
        .should('eq',1);
        //Confirm incomplete tasks
        cy.get(list)
        .find(checkbox)
        .filter(':not(:checked)')
        .its('length')
        .should('eq',taskCount);
        //reload the page
        cy.reload();     
        //Iterate over items in list
        //Check task and status have been retained
        for(let i=0; i<=taskCount; i++) {  
            var task = '.todo-item-'+ i.toString()+'>[type="text"]' 
            var todoText = 'This is To-Do item '+ i.toString()
            cy.get(task)
            .should('have.value', todoText)
        }
    //Confirm the first task is still complete
    cy.get(list)
    cy.get('@done')
      .find(checkbox)
      .should('be.checked')
        //Confirm all other tasks are incomplete
     cy.get(list)
      .find(checkbox)
      .filter(':not(:checked)')
      .its('length')
      .should('eq',taskCount);     
        }
          )}
      )

