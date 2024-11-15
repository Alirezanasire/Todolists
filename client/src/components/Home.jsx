import React, { useEffect, useState } from 'react';
import Create from './Create';
import axios from 'axios';
import { AiFillCheckCircle, AiOutlineCheckCircle, AiFillDelete } from 'react-icons/ai';
import './Home.css';

const Home = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const result = await axios.get('http://localhost:3001/todos');
      setTodos(result.data);
    };
    fetchTodos();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/delete/${id}`);
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  const handleEdit = async (id) => {
    await axios.put(`http://localhost:3001/update/${id}`);
    setTodos(todos.map((todo) => (todo._id === id ? { ...todo, done: !todo.done } : todo)));
  };

  return (
    <div className="container">
      <h1 className="heading">My Todo List</h1>
      <Create />
      <div className="todo-list">
        {todos.length === 0 ? (
          <p className="no-records">No records</p>
        ) : (
          todos.map((todo) => (
            <div key={todo._id} className="todo-item">
              <span className={`todo-text ${todo.done ? 'done' : ''}`}>{todo.task}</span>
              <button
                onClick={() => handleDelete(todo._id)}
                className="action-btn delete-btn"
              >
                <AiFillDelete />
              </button>
              <button
                onClick={() => handleEdit(todo._id)}
                className="action-btn check-btn"
              >
                {todo.done ? (
                  <AiFillCheckCircle style={{ color: 'green' }} />
                ) : (
                  <AiOutlineCheckCircle style={{ color: 'gray' }} />
                )}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
