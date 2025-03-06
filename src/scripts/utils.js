const BASE_URL = "https://notes-api.dicoding.dev/v2";

export async function getNotes() {
    try {
        const response = await fetch(`${BASE_URL}/notes`);
        const responseJson = await response.json();
        return responseJson.data;
    } catch (error) {
        console.error("Error fetching notes:", error);
        return [];
    }
}

export async function getArchivedNotes() {
    try {
        const response = await fetch(`${BASE_URL}/notes/archived`);
        const responseJson = await response.json();
        return responseJson.data;
    } catch (error) {
        console.error("Error fetching archived notes:", error);
        return [];
    }
}

export async function createNote(title, body) {
    try {
        const response = await fetch(`${BASE_URL}/notes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, body }),
        });
        const responseJson = await response.json();
        return responseJson.data;
    } catch (error) {
        console.error("Error creating note:", error);
        return null;
    }
}

export async function deleteNote(id) {
    try {
        await fetch(`${BASE_URL}/notes/${id}`, {
        method: "DELETE",
        });
        return true;
    } catch (error) {
        console.error("Error deleting note:", error);
        return false;
    }
}

export async function archiveNote(id) {
    try {
        await fetch(`${BASE_URL}/notes/${id}/archive`, {
        method: "POST",
        });
        return true;
    } catch (error) {
        console.error("Error archiving note:", error);
        return false;
    }
}

export async function unarchiveNote(id) {
    try {
        await fetch(`${BASE_URL}/notes/${id}/unarchive`, {
        method: "POST",
        });
        return true;
    } catch (error) {
        console.error("Error unarchiving note:", error);
        return false;
    }
}
