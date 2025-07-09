import { useState, useEffect } from 'react';
import './App.css';
import { CreateTodo } from './components/CreateTodo';
import { Todos } from './components/Todos';

function App() {
  const [todos, settodos] = useState([]);

  function fetchTodos() {
    fetch("http://localhost:3001/todos")
      .then(async res => {
        const json = await res.json();
        settodos(json.todos);
      })
      .catch(err => console.error("Error fetching todos:", err));
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  function toggleCompleted(id) {
    fetch("http://localhost:3001/toggle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    })
      .then(async res => {
        const json = await res.json();
        alert(json.msg);
        fetchTodos();
      })
      .catch(err => alert("Error toggling"));
  }

  function deleteTodo(id) {
    fetch("http://localhost:3001/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    })
      .then(async res => {
        const json = await res.json();
        alert(json.msg);
        fetchTodos();
      })
      .catch(err => alert("Error deleting"));
  }

  return (
    <div>
      <CreateTodo onAdd={fetchTodos} />
      <Todos todos={todos} toggleCompleted={toggleCompleted} deleteTodo={deleteTodo} />
    </div>
  );
}

export default App;
