require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('Connection error:', err));

const Todo = require('./models/todo');

app.post('/add', async (req, res) => {
    const task = req.body.task;
    try {
        const newTodo = await Todo.create({ task });
        res.json(newTodo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(id, { done: true }, { new: true });
        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Todo.findByIdAndDelete(id);
        res.json({ message: 'Todo deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
