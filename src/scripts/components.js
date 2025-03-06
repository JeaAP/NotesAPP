import { createNote, deleteNote, archiveNote, unarchiveNote } from "./utils.js";

class AppBar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
                <header class="app-bar">
                    <h1>Notes APP</h1>
                    <nav>
                        <ul>
                            <li><a href="index.html">Home</a></li>
                            <li><a href="archived.html">Archived</a></li> 
                        </ul>
                    </nav>
                </header>
            `;
    }
}
customElements.define("app-bar", AppBar);

class NoteForm extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.innerHTML = `
        <section id="note-form-section">
            <h2>Add New Note</h2>
            <form id="note-form">
            <div>
                <label for="title">Title :</label>
                <input type="text" id="title" name="title" required>
            </div>

            <div>
                <label for="body">Content :</label>
                <textarea id="body" name="body" required></textarea>
            </div>

            <button type="submit">Add Note</button>
            </form>
        </section> 
        `;
    }

    setupEventListeners() {
        const form = document.getElementById("note-form");
        const loadingIndicator = document.querySelector("loading-indicator");

        form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const title = document.getElementById("title").value;
        const body = document.getElementById("body").value;

        if (!title || !body) return;

        loadingIndicator.show();
        try {
            const newNote = await createNote(title, body);

            if (newNote) {
            // Refresh the notes list
            const customEvent = new CustomEvent("note-created");
            document.dispatchEvent(customEvent);
            }
        } catch (error) {
            console.error("Error creating note:", error);
        } finally {
            loadingIndicator.hide();
            form.reset();
        }
        });
    }
}
customElements.define("note-form", NoteForm);

class NoteItem extends HTMLElement {
    constructor() {
        super();

        this._note = {
        id: "",
        title: "",
        body: "",
        createdAt: "",
        archived: false,
        };
    }

    setNote(value) {
        this._note = value;
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="note" data-note-id="${this._note.id}" class="${
            this._note.archived ? "archived" : ""
            }">
                <h3 class="note-title">${this._note.title}</h3>
                <p class="note-body">${this._note.body}</p>
                <small class="note-date">Created at: ${new Date(
                this._note.createdAt
                ).toLocaleString()}</small>
                <button class="delete-btn" id="delete-btn">Delete</button>
                <button class="archive-btn" id="archive-btn">${
                this._note.archived ? "Unarchive" : "Archive"
                }</button>
            </div>

            <style>
                .archived .note-title,
                .archived .note-body,
                .archived .note-date {
                color: #e0e0e0 !important;
                -webkit-text-fill-color: unset !important;
                }
                .archived .delete-btn {
                background-color: #e0e0e0 !important;
                }
                .archived .archive-btn {
                background-color:rgb(193, 212, 175) !important;
                }
            </style>
        `;

        if (this._note.archived) {
        this.classList.add("archived");
        } else {
        this.classList.remove("archived");
        }

        this.setupEventListeners();
    }

    setupEventListeners() {
        const loadingIndicator = document.querySelector("loading-indicator");

        this.querySelector(".delete-btn").addEventListener("click", async () => {
        loadingIndicator.show();
        try {
            const success = await deleteNote(this._note.id);
            if (success) {
            this.remove();
            }
        } catch (error) {
            console.error("Error deleting note:", error);
        } finally {
            loadingIndicator.hide();
        }
        });

        this.querySelector(".archive-btn").addEventListener("click", async () => {
        loadingIndicator.show();
        try {
            let success;
            if (this._note.archived) {
            success = await unarchiveNote(this._note.id);
            } else {
            success = await archiveNote(this._note.id);
            }

            if (success) {
            this._note.archived = !this._note.archived;
            this.render();

            document.dispatchEvent(new CustomEvent("notes-updated"));
            }
        } catch (error) {
            console.error("Error updating archive status:", error);
        } finally {
            loadingIndicator.hide();
        }
        });
    }
}
customElements.define("note-item", NoteItem);
