const fs = require('fs');

/**
 * Return object of Notes.
 * Checks if the file exists.
 * @returns {*}
 */
var fetchNotes = () => {
    try {
        var notesString = fs.readFileSync('notes-data.json');
        return  JSON.parse(notesString);
    } catch (e) {
        return [];
    }
};

/**
 * Saves the note in a file.
 * @param notes
 */
var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};


/**
 * Adds Note
 * @param title
 * @param body
 * @returns {{title: *, body: *}}
 */
var addNote = (title, body) => {
    var notes = fetchNotes();
    var note = {
        title: title,
        body: body
    }

    // Check if the note already exists.
    var duplicateNotes = notes.filter((note) => note.title === title);

    // If the note does not exist, the system will create it.
    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

/**
 * Get all notes
 */
var getAll = () => {
    return fetchNotes();
};

/**
 * get one note
 * @param title
 */
var getNote = (title) => {
    var notes = fetchNotes();
    var filterNotes = notes.filter((note) => note.title === title);
    return filterNotes[0];
}

/**
 * Remove notes
 * @param title
 * @returns {boolean}
 */
var removeNote = (title) => {
    var notes = fetchNotes();
    var filteredNotes = notes.filter((note) => note.title !== title);
    saveNotes(filteredNotes);

    if (notes.length > filteredNotes.length) {
       return  true;
    } else {
       return false;
    }
}

/**
 * Logs Note fields.
 * @param note
 */
var logNote = (note) => {
    console.log('---');
    console.log("Title: " + note.title);
    console.log("Body: " + note.body);
}

/**
 * Exports functions
 * @type {{addNote: addNote, getAll: getAll, getNote: function(*): *, removeNote: removeNote}}
 */
module.exports = {
    addNote: addNote,
    getAll: getAll,
    getNote: getNote,
    removeNote: removeNote,
    logNote: logNote
};
