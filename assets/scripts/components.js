import { deleteNote, archiveNote, unarchiveNote } from './utils.js';

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
                <!-- <nav>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="archived.html">Archived</a></li> 
                    </ul>
                </nav> !-->
            </header>
        `;
    }
}
customElements.define('app-bar', AppBar);

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
                <form id="note-form">
                    <div>
                        <label for="title">Title :</label>
                        <input type="text" id="title" name="title" required>
                    </div>

                    <div>
                        <label for="body">Content :</label>
                        <textarea id="body" name="body" required></textarea>
                    </div>

                    <div>
                        <label for="date">Created At :</label>
                        <input type="datetime-local" id="date" name="date" required>
                    </div>

                    <div>
                        <label for="archived">Archived :
                            <input type="checkbox" id="archived" name="archived">
                        </label>
                        
                    </div>

                    <button type="submit">Add Note</button>
                </form>
            </section> 
        `;
    }

    setupEventListeners() {
        const form = document.getElementById('note-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const title = document.getElementById('title').value;
            const body = document.getElementById('body').value;
            const createdAt = document.getElementById('date').value;
            const archived = document.getElementById('archived').checked;

            const note = {
                id: Date.now().toString(),
                title,
                body,
                createdAt,
                archived,
            };

            const noteList = document.querySelector('note-list');
            if (noteList) {
                const currentNotes = [...noteList._notes];
                currentNotes.push(note);
                noteList.setNotes(currentNotes);
            }

            form.reset();
        });
    }
}
customElements.define('note-form', NoteForm);

class NoteItem extends HTMLElement {
    constructor() {
        super();

        this._note = {
            id: '',
            title: '',
            body: '',
            createdAt: '',
            archived: false,
        };
    }

    setNote(value) {
        this._note.id = value.id;
        this._note.title = value.title;
        this._note.body = value.body;
        this._note.createdAt = value.createdAt;
        this._note.archived = value.archived;

        this.render();
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.setAttribute('data-id', this._note.id);

        this.innerHTML = `
            <div class="note" data-note-id="${this._note.id}" class="${this._note.archived ? 'archived' : ''}">
                <h3 class="note-title">${this._note.title}</h3>
                <p class="note-body">${this._note.body}</p>
                <small class="note-date">Created at: ${new Date(this._note.createdAt).toLocaleString()}</small>
                <button class="delete-btn" id="delete-btn">Delete</button>
                <button class="archive-btn" id="archive-btn">${this._note.archived ? 'Unarchive' : 'Archive'}</button>
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
            this.classList.add('archived');
        } else {
            this.classList.remove('archived');
        }

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.querySelector('.delete-btn').addEventListener('click', () => {
            deleteNote(this._note.id);
            this.remove();
        });

        this.querySelector('.archive-btn').addEventListener('click', () => {
            if (this._note.archived) {
                unarchiveNote(this._note.id);
            } else {
                archiveNote(this._note.id);
            }
            this._note.archived = !this._note.archived;
            this.render();
        });
    }
}
customElements.define('note-item', NoteItem);

class NoteList extends HTMLElement {
    constructor() {
        super();

        this._notes = [];
    }

    setNotes(notes) {
        this._notes = notes;
        this.render();
    }

    connectedCallback() {
        this.render();
    }
    
    render() {
        const noteItemElements = this._notes.map((note) => {
            const noteItem = document.createElement('note-item');
            noteItem.setNote(note);
            return noteItem;
        });

        this.innerHTML = '';
        noteItemElements.forEach((noteItem) => {
            this.appendChild(noteItem);
        });
    }
}
customElements.define('note-list', NoteList);

// class Bibliography extends HTMLElement {
// }
// customElements.define('bibliography', Bibliography);