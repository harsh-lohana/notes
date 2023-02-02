const btnEl = document.getElementById("btn");
const appEl = document.getElementById("app");

getNotes().forEach((note) => {
    const noteEl = createNoteElement(note);
    appEl.insertBefore(noteEl, btnEl);
});

function createNoteElement(noteObj) {
    const element = document.createElement("textarea");
    element.classList.add("note");
    element.placeholder = "Empty Note";
    element.value = noteObj.content;

    element.addEventListener("dblclick", () => {
        const warning = confirm("Do you want to delete the note?");
        if(warning)
            deleteNote(noteObj.id, element);
    });

    element.addEventListener("input", () => {
        updateNote(noteObj.id, element.value);
    });
    return element;
}

function deleteNote(id, element) {
    const notes = getNotes().filter((note) => note.id != id)
    saveNote(notes);
    appEl.removeChild(element);
}

function updateNote(id, content) {
    const notes = getNotes();
    const target = notes.filter((note) => note.id == id)[0];
    target.content = content;
    saveNote(notes);
}

function addNote() {
    const notes = getNotes();
    const noteObj = {
        id: Math.floor(Math.random() * 100000),
        content: ""
    };

    const noteEl = createNoteElement(noteObj);
    appEl.insertBefore(noteEl, btnEl);

    notes.push(noteObj);

    saveNote(notes);
}

function saveNote(notes) {
    localStorage.setItem("notes-app", JSON.stringify(notes));
}

function getNotes() {
    return JSON.parse(localStorage.getItem("notes-app") || "[]")
}

btnEl.addEventListener("click", addNote);