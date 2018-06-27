const _ = require('lodash');
const yargs =  require('yargs');

const notes = require('./notes');

/**
 *
 * @type {{describe: string, demand: boolean, alias: string}}
 */
var titleOptions =  {
    describe: 'Title of note',
    demand: true,
    alias: 't'
}

/**
 *
  * @type {{describe: string, demand: boolean, alias: string}}
 */
var bodyOptions = {
    describe: "Body of the note",
    demand: true,
    alias: 'b'
}

/**
 * Builds Help commands and sets required fields.
 */
const argv = yargs
    .command('add', 'Add a new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'List all notes')
    .command('read', 'Read a node', {
        title: titleOptions,
    })
    .command('remove', 'remove a note', {
        title: titleOptions,
    })
    .help()
    .argv;

/**
 * Get commands from argv.
 */
var command = argv._[0];

/**
 * Switch between commands and perform relative action.
 */
switch (command) {
    case 'add':
        var note = notes.addNote(argv.title, argv.body);
        if (note) {
            console.log("Created new note");
            notes.logNote(note);
        } else {
            console.log("Note already exists");
        }
        break;
    case 'list':
        var allNotes  = notes.getAll();
        console.log("Printing: " + allNotes.length + " note(s).");
        allNotes.forEach((note) => {
            notes.logNote(note);
        });
        break;
    case 'read':
        var note = notes.getNote(argv.title);
        if (note) {
            console.log('Reading note');
            notes.logNote(note);
        } else {
            console.log('Note not found');
        }
        break;
    case 'remove':
        var noteRemoved = notes.removeNote(argv.title);
        if (noteRemoved) {
            console.log("Note " + argv.title + " was removed");
        } else {
            console.log("Note not found");
        }
        break;
    default:
        console.log("Command not recognised");
}
