describe('Todo App', () => {
  before(() => {
    // Visit, clear localStorage, and reload to start fresh
    cy.visit('/');
    cy.window().then((win) => {
      win.localStorage.clear();
    });
    cy.reload();
  });

  it('loads the app successfully', () => {
    cy.contains('h1', 'Basic CRUD ToDo web app');
    cy.get('#task-form').should('be.visible');
  });

  it('creates a new task', () => {
    cy.get('#topic').type('Test Task 1');
    cy.get('#priority').select('low');
    cy.get('#description').type('This is a test description 1');
    cy.get('#save-btn').click();

    cy.get('#topic').type('Test Task 2');
    cy.get('#priority').select('low');
    cy.get('#description').type('This is a test description 2');
    cy.get('#save-btn').click();

    cy.get('#topic').type('Test Task 3');
    cy.get('#priority').select('medium');
    cy.get('#description').type('This is a test description 3');
    cy.get('#save-btn').click();

    cy.get('#topic').type('Test Task 4');
    cy.get('#priority').select('medium');
    cy.get('#description').type('This is a test description 4');
    cy.get('#save-btn').click();

    cy.get('#topic').type('Test Task 5');
    cy.get('#priority').select('high');
    cy.get('#description').type('This is a test description 5');
    cy.get('#save-btn').click();

    cy.get('#task-list').should('contain', 'Test Task');
    cy.get('#task-list').should('contain', 'This is a test description');
  });

  it('deletes a task', () => {
    cy.get('#topic').type('Task to Delete');
    cy.get('#save-btn').click();

    // Find the specific task and click its Delete button
    cy.contains('.task', 'Task to Delete')
      .find('button')
      .contains('Delete')
      .click();

    cy.get('#task-list').should('not.contain', 'Task to Delete');
  });

  it('completes a task', () => {
    cy.get('#topic').type('Task to Complete');
    cy.get('#save-btn').click();

    // Find the specific task and click its Complete button
    cy.contains('.task', 'Task to Complete')
      .find('button')
      .contains('Complete')
      .click();
    
    cy.contains('.task', 'Task to Complete').should('have.class', 'done');
    cy.contains('.task', 'Task to Complete')
      .find('button')
      .should('contain', 'Undo');
  });

  it('filters tasks by priority', () => {
    // Create tasks with different priorities
    cy.get('#topic').type('Low Priority Task');
    cy.get('#priority').select('low');
    cy.get('#save-btn').click();

    cy.get('#topic').type('High Priority Task');
    cy.get('#priority').select('high');
    cy.get('#save-btn').click();

    // Test filtering
    cy.get('[data-filter="low"]').click();
    cy.get('#task-list').should('contain', 'Low Priority Task');
    cy.get('#task-list').should('not.contain', 'High Priority Task');

    cy.get('[data-filter="high"]').click();
    cy.get('#task-list').should('contain', 'High Priority Task');
    cy.get('#task-list').should('not.contain', 'Low Priority Task');
  });

  it('shows all tasks when All filter is clicked', () => {
    cy.get('[data-filter="all"]').click();
    cy.get('#task-list').should('contain', 'Test Task');
    cy.get('#task-list').should('contain', 'Low Priority Task');
    cy.get('#task-list').should('contain', 'High Priority Task');
  });
});
