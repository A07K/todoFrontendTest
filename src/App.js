import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  const addTask = () => {
    if (task.trim()) {
      fetch("http://localhost:3001/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task }),
      }).then(() => {
        setTasks([...tasks, task]);
        setTask("");
      });
    }
  };

  const removeTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);

    fetch(`http://localhost:3001/tasks/${index}`, {
      method: "DELETE",
    }).then(() => {
      const newTasks = tasks.filter((_, i) => i !== index);
      setTasks(newTasks);
    });
  };

  return (
    <div className="App">
      <h1>To-do</h1>
      <input
        text="text"
        value={task}
        placeholder="Add a task"
        onChange={(e) => setTask(e.target.value)}
      ></input>
      <button onClick={addTask}>Add the task</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => removeTask(index)}>-</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
