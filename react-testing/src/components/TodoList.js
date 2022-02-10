import React, { useState } from 'react';
import Todo from './Todo';

const TodoList = () => {
    const [todoTitle, setTodoTitle] = useState('');
    const [todoCompleted, setTodoCompleted] = useState(false);
    const [todoList, setTodoList] = useState([]);

    const addTodoItem = () => {
        const newTodoItem = {
            id: todoList.length + 1,
            title: todoTitle,
            completed: todoCompleted,
        }
        setTodoList([...todoList, newTodoItem]);
        setTodoTitle('');
        setTodoCompleted(false);
    };

    return (
        <div>
            <h1>Todo List</h1>
            {todoList.map(todo => <Todo key={todo.id} todo={todo} />)}
            <input
                onChange={(event) => setTodoTitle(event.target.value)}
                type="text"
                placeholder="Todo title"
                value={todoTitle} />
            <p />
            Completed:
            <input
                onChange={(event) => setTodoCompleted(event.target.checked)}
                type="checkbox"
                checked={todoCompleted} />
            <p />
            <button onClick={addTodoItem}>Add Todo Item</button>
        </div>
    );
}

export default TodoList;
