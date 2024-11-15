import React, { useState } from 'react';
import axios from 'axios';
import './Create.css';

const Create = () => {
  const [task, setTask] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3001/add', { task });
    setTask('');
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new task"
        required
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default Create;
