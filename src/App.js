import React, { useState } from "react";
import "./index.css";

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: "Do laundry", completed: false, editing: false },
    { id: 2, text: "Wash dishes", completed: true, editing: false },
    { id: 3, text: "Clean bedroom", completed: false, editing: false },
    { id: 4, text: "Take out trash", completed: true, editing: false },
    { id: 5, text: "Grocery shopping", completed: false, editing: false },
  ]);

  const [newTodo, setNewTodo] = useState("");

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      const todo = {
        id: Date.now(),
        text: newTodo,
        completed: false,
        editing: false,
      };
      setTodos([todo, ...todos]);
      setNewTodo("");
    }
  };

  const handleToggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, editing: true };
        }
        return todo;
      })
    );
  };

  const handleSaveTodo = (id, newText) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, text: newText, editing: false };
        }
        return todo;
      })
    );
  };

  return (
    <div className="todo-list-container">
      <h1>Todays Todo List</h1>
      <input
        type="text"
        placeholder="Feed pets"
        value={newTodo}
        onChange={handleInputChange}
        className="add-input"
      />
      <button
        onClick={handleAddTodo}
        className={`add-button ${newTodo.trim() !== "" ? "clicked" : ""}`}
      >
        Add
      </button>{" "}
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleComplete={handleToggleComplete}
            onDeleteTodo={handleDeleteTodo}
            onEditTodo={handleEditTodo}
            onSaveTodo={handleSaveTodo}
          />
        ))}
      </ul>
    </div>
  );
};

const TodoItem = ({
  todo,
  onToggleComplete,
  onDeleteTodo,
  onEditTodo,
  onSaveTodo,
}) => {
  const handleCheckboxChange = () => {
    onToggleComplete(todo.id);
  };

  const handleDeleteClick = () => {
    onDeleteTodo(todo.id);
  };

  const handleEditClick = () => {
    onEditTodo(todo.id);
  };

  const handleSaveClick = () => {
    const newText = inputRef.current.value;
    onSaveTodo(todo.id, newText);
  };

  const inputRef = React.useRef();

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleCheckboxChange}
      />
      {todo.editing ? (
        <>
          <input type="text" defaultValue={todo.text} ref={inputRef} />
          <button onClick={handleSaveClick}>Save</button>
        </>
      ) : (
        <>
          <span
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            {todo.text}
          </span>
          <button onClick={handleEditClick}>Edit</button>
        </>
      )}
      <button onClick={handleDeleteClick} disabled={!todo.completed}>
        Delete
      </button>
    </li>
  );
};

export default TodoList;
