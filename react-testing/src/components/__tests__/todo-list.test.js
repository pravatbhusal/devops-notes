import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from '../TodoList';

test('Unit Test - Reset the todo list inputs whenever adding a new todo item', () => {
    render(<TodoList />);

    // We can get the elements by simplying specifying the type of element to the testing-library
    const todoTitleInput = screen.getByRole('textbox');
    const todoCompletedCheckbox = screen.getByRole('checkbox');
    const addTodoBtn = screen.getByRole('button');

    // Type "Code unit tests" todo item into the text field and select the completed checkbox
    userEvent.type(todoTitleInput, 'Code unit tests');
    userEvent.click(todoCompletedCheckbox);

    // Verify the title and checkbox are correct
    expect(todoTitleInput).toHaveValue('Code unit tests');
    expect(todoCompletedCheckbox).toBeChecked();

    // Add the new todo item
    userEvent.click(addTodoBtn);

    // Verify the title is reset to empty and checkbox is unchecked
    expect(todoTitleInput).toHaveValue('');
    expect(todoCompletedCheckbox).not.toBeChecked();
});

test('Integration Test - Add multiple todo items into the todo list', () => {
    render(<TodoList />);

    const todoTitleInput = screen.getByRole('textbox');
    const todoCompletedCheckbox = screen.getByRole('checkbox');
    const addTodoBtn = screen.getByRole('button');

    // Add first todo item "Eat"
    userEvent.type(todoTitleInput, 'Eat');
    userEvent.click(todoCompletedCheckbox);
    userEvent.click(addTodoBtn);

    // Add second todo item "Sleep"
    userEvent.type(todoTitleInput, 'Sleep');
    userEvent.click(addTodoBtn);

    // Add third todo item "Lift"
    userEvent.type(todoTitleInput, 'Lift');
    userEvent.click(todoCompletedCheckbox);
    userEvent.click(addTodoBtn);


    // Verify the Eat todo was added into the todo list
    const todoElement1 = screen.getByTestId('todo-1');
    expect(todoElement1).toHaveTextContent('Eat');
    expect(todoElement1).toContainHTML('strike');

    // Verify the Sleep todo was added into the todo list
    const todoElement2 = screen.getByTestId('todo-2');
    expect(todoElement2).toHaveTextContent('Sleep');
    expect(todoElement2).not.toContainHTML('strike');

    // Verify the Lift todo was added into the todo list
    const todoElement3 = screen.getByTestId('todo-3');
    expect(todoElement3).toHaveTextContent('Lift');
    expect(todoElement3).toContainHTML('strike');
});