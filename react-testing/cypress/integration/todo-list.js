describe('E2E Test - Add a todo item and refresh page', () => {
    it('Add "Make food" todo item', () => {
        cy.visit('localhost:3000');

        // Add "Party tonight" todo item and select the completed checkbox
        cy.findByRole('textbox').type('Party tonight')
        cy.findByRole('checkbox').check();

        // Verify the title and checkbox are correct
        cy.findByRole('textbox').should('have.value', 'Party tonight');
        cy.findByRole('checkbox').should('be.checked');

        // Add the new item
        cy.findByRole('button').click();

        // Verify item was added into the list
        cy.get('[data-testid=todo-1]').should('have.text', 'Party tonight');

        // Reload the page and verify the item is no longer in the list
        cy.reload();
        cy.get('[data-testid=todo-1]').should('not.exist');
    });
});