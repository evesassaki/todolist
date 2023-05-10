import React, { useEffect, useState } from "react";

//components
import EditTodo from "./EditTodo.js";

const ListTodos = () => {
  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };
  const [todos, setTodos] = useState([]);
  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);
  return (
    <>
      <table className="table text-center">
        <tr>
          <th>Todo</th>
          <th>edit</th>
          <th>delete</th>
        </tr>

        {todos.map((todo) => (
          <tr key={todo.todo_id}>
            <td>{todo.description}</td>
            <td>
              <EditTodo todo={todo} />
            </td>
            <td>
              <i
                className="bi bi-trash3"
                onClick={() => deleteTodo(todo.todo_id)}
              ></i>
            </td>
          </tr>
        ))}
      </table>
    </>
  );
};

export default ListTodos;
