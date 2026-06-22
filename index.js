const express = require('express');
const app = express();
app.use(express.json()); // Parse incoming JSON request bodies

// In-memory store for todos
let todos = [];
let nextId = 1; // Auto-incrementing ID counter

// Health check
app.get('/', (req, res) => {
    res.send('Todo API is running');
});

// Get all todos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// Create a new todo
app.post('/todos', (req, res) => {
    const { title } = req.body;

    const todo = {
        id: nextId++,
        title,
        completed: false,
        createdAt: new Date()
    };

    todos.push(todo);
    res.status(201).json(todo);
});

// Get a single todo by ID
app.get('/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  res.json(todo);
});

// Update a todo's title and/or completed status
app.patch('/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  const { title, completed } = req.body;

  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;

  res.json(todo);
});

// Delete a todo by ID
app.delete('/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = todos.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  todos.splice(index, 1);
  res.status(204).send();
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
