// Load environment variables from .env file
require('dotenv').config();

// Import the database connection pool
const pool = require('./db');  
const express = require('express');
const app = express();
app.use(express.json()); // Parse incoming JSON request bodies

// Health check
app.get('/', (req, res) => {
    res.send('Todo API is running');
});

// Get all todos
app.get('/todos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM todos');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new todo
app.post('/todos', async (req, res) => {

    try {
        const { title } = req.body;
        const result = await pool.query(
            'INSERT INTO todos (title, completed) VALUES ($1, $2) RETURNING *',
            [title, false]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Get a single todo by ID
app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM todos WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a todo's title and/or completed status
app.patch('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    const result = await pool.query(
      `UPDATE todos SET
        title = COALESCE($1, title),
        completed = COALESCE($2, completed)
       WHERE id = $3 RETURNING *`,
      [title, completed, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a todo by ID
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM todos WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});