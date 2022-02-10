import Todo from './components/Todo';
import './App.css';

const todos = [
  { id: 1, title: 'Wash dishes', completed: false },
  { id: 2, title: 'Make dinner', completed: true }
];

function App() {
  return (
    <div className="App">
      {todos.map(todo => <Todo todo={todo} />)}
    </div>
  );
}

export default App;
