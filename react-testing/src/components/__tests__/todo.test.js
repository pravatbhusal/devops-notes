import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Todo from '../Todo';

test('Todo item with completed false', () => {
    const todo = { id: 1, title: 'Wash dishes', completed: false };
    render(<Todo todo={todo} />);

    const todoElement = screen.getByTestId('todo-1');

    // Verify the element with data-testid "todo-1" to exist in the DOM
    expect(todoElement).toBeInTheDocument();

    // Verify todoElement to have the text "Wash dishes"
    expect(todoElement).toHaveTextContent('Wash dishes');

    // Verify that todoElement is not striked, so that means it's not completed
    expect(todoElement).not.toContainHTML('strike');
});

test('Todo item with completed true', () => {
    const todo = { id: 1, title: 'Make dinner', completed: true };
    render(<Todo todo={todo} />);

    const todoElement = screen.getByTestId('todo-1');

    // Verify the element with data-testid "todo-1" to exist in the DOM
    expect(todoElement).toBeInTheDocument();

    // Verify todoElement to have the text "Make dinner"
    expect(todoElement).toHaveTextContent('Make dinner');

    // Verify that todoElement is striked, so that means it's completed
    expect(todoElement).toContainHTML('strike');
});

test('Renderer tree matches todo.test.js.snap', () => {
    const todo = { id: 1, title: 'Eat food', completed: true };

    // Returns a JSON tree of the Todo component
    const tree = renderer.create(<Todo todo={todo} />).toJSON();

    /**
     * Creates a snapshot todo.test.js.snap and expects the tree to match the snapshot.
     * 
     * Note that if you modify the component, then this will not update the snapshot and
     * will fail the test. If you don't want it to fail, you need to update the snapshot
     * by pressing 'u' after running the tests.
     */
    expect(tree).toMatchSnapshot();
});
