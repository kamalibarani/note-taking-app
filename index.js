const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware to parse JSON requests
app.use(express.json());

// In-memory data store for notes
let notes = [];

// Route to get all notes
app.get('/notes', (req, res) => {
    res.json(notes);
});

// Route to add a new note
app.post('/notes', (req, res) => {
    const { title, content } = req.body;
    const newNote = { id: notes.length + 1, title, content };
    notes.push(newNote);
    res.status(201).json(newNote);
});

// Route to update an existing note
app.put('/notes/:id', (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const index = notes.findIndex(note => note.id == id);
    if (index !== -1) {
        notes[index] = { id: parseInt(id), title, content };
        res.json(notes[index]);
    } else {
        res.status(404).json({ error: 'Note not found' });
    }
});

// Route to delete a note
app.delete('/notes/:id', (req, res) => {
    const { id } = req.params;
    const index = notes.findIndex(note => note.id == id);
    if (index !== -1) {
        notes.splice(index, 1);
        res.status(204).end();
    } else {
        res.status(404).json({ error: 'Note not found' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
