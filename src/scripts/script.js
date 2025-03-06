import '../styles/style.css';
import { getNotes, getArchivedNotes } from "./utils.js";
import "./components.js";
import "./LoadingIndicator.js";

// Rest of your code remains the same
document.addEventListener("DOMContentLoaded", async () => {
    const notesContainer = document.querySelector("#notes-container");
    const searchInput = document.querySelector("#searchInput");
    const loadingIndicator = document.createElement("loading-indicator");
    document.body.appendChild(loadingIndicator);

    let allNotes = [];

    async function fetchAndRenderNotes() {
        loadingIndicator.show();
        try {
        const isArchivedPage = window.location.pathname.includes("archived.html");

        if (isArchivedPage) {
            allNotes = await getArchivedNotes();
        } else {
            allNotes = await getNotes();
        }

        renderNotes(allNotes);
        } catch (error) {
        console.error("Error fetching notes:", error);
        } finally {
        loadingIndicator.hide();
        }
    }

    function renderNotes(notes) {
        notesContainer.innerHTML = "";

        if (notes.length === 0) {
        notesContainer.innerHTML = "<p class='no-notes'>No notes found</p>";
        return;
        }

        notes.forEach((note) => {
        const noteItem = document.createElement("note-item");
        noteItem.setNote(note);
        notesContainer.appendChild(noteItem);
        });
    }
    await fetchAndRenderNotes();

    searchInput?.addEventListener("input", (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const filteredNotes = allNotes.filter(
        (note) =>
            note.title.toLowerCase().includes(searchTerm) ||
            note.body.toLowerCase().includes(searchTerm)
        );

        renderNotes(filteredNotes);
    });

    document.addEventListener("note-created", fetchAndRenderNotes);
    document.addEventListener("notes-updated", fetchAndRenderNotes);
});
