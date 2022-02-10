import React from 'react';

const Todo = (props) => {
    const { todo } = props;
    const todoTitle = <h1>{todo.title}</h1>;
    return (
        <div data-testid={`todo-${todo.id}`}>
            {todo.completed ? <strike>{todoTitle}</strike> : todoTitle}
        </div>
    );
}

export default Todo;
