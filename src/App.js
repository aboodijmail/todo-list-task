import React, { useState, useEffect } from "react";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchTodos = async () => {
    const response = await fetch("https://dummyjson.com/todos");
    const data = await response.json();
    console.log("data.todos", data);

    setTodos(data.todos);
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;

    const newTask = { id: Date.now(), todo: newTaskText, completed: false };
    setTodos([newTask, ...todos]);
    setNewTaskText("");
  };

  const handkeCompletion = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    let filteredtodoes = todos.filter((todo) => todo.id !== id);
    setTodos(filteredtodoes);
  };

  const fetchTaskDetails = async (id) => {
    try {
      const response = await fetch(`https://dummyjson.com/todos/${id}`);
      const data = await response.json();
      setSelectedTask(data);
    } catch (error) {
      console.error("Error fetching task details:", error);
    }
  };

  return (
    <div
      style={{
        padding: "40px",
      }}
    >
      <div className="task-row">
        <input
          type="text"
          className="task-input"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Add a new Task"
        />
        <button className="task-add-button" onClick={addTodo}>
          Add
        </button>
      </div>
      <div className="todo-container">
        <ul className="todo-list">
          {todos.map((task) => (
            <li key={task.id} className={`todo-item `}>
              <span
                style={{ cursor: "pointer" }}
                className={`${task.completed ? "todo-completed" : ""}`}
                onClick={() => fetchTaskDetails(task.id)}
              >
                {task.todo}
              </span>
              <div  className="task-actions">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handkeCompletion(task.id)}
                  className=""
                />

                <button
                  onClick={() => deleteTodo(task.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
        {selectedTask && (
          <div className="task-details">
            <h3>Task Details</h3>
            <p>
              <strong>ID:</strong> {selectedTask.id}
            </p>
            <p>
              <strong>Todo:</strong> {selectedTask.todo}
            </p>
            <p>
              <strong>Completed:</strong>{" "}
              {selectedTask.completed ? "Yes" : "No"}
            </p>
            <p>
              <strong>User ID:</strong> {selectedTask.userId}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
