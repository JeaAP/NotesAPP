import { getNotes, deleteNote, generateNote, archiveNote, unarchiveNote } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const notesContainer = document.querySelector('#notes-container');
    const searchInput = document.querySelector('#searchInput');


    function renderNotes() {
        const notes = getNotes();

        notesContainer.innerHTML = '';
        notes.forEach(note => {
            const noteItem = document.createElement('note-item');
            noteItem.setNote(note);
            notesContainer.appendChild(noteItem);
        });
    }
    renderNotes();

    searchInput?.addEventListener('input', (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const notes = getNotes();
        const filteredNotes = notes.filter(note => 
            (note.title.toLowerCase().includes(searchTerm) || 
            note.body.toLowerCase().includes(searchTerm))
        );

        notesContainer.innerHTML = '';
        filteredNotes.forEach(note => {
            const noteItem = document.createElement('note-item');
            noteItem.setNote(note);
            notesContainer.appendChild(noteItem);
        });
    });
});
