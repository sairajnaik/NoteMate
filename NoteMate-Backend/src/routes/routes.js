const express = require('express');
const router = express.Router();

const notes = require('../controllers/notes.controller.js');

router.get('/get-all-notes', notes.getAllNotes);

router.post('/add-new-note', notes.addNewNote);

router.delete('/delete/:id', notes.deleteNote);

router.put('/update', notes.updateNote);

module.exports = router;