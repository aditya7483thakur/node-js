const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { addNote, removeNote,listNotes, readNotes } = require('./notes');

const argvProcessor = yargs(hideBin(process.argv));

argvProcessor.command(
  'add',
  'Add a new note',
  {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string'
    }
  },
  (argv) => {
    addNote(argv.title,argv.body)
  }
)

argvProcessor.command(
  'remove',
  'Remove new note',
  {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
  },
  (argv) => {
    removeNote(argv.title)
  }
)

argvProcessor.command(
  'list',
  'List of notes',
  () => {
    listNotes()
  }
)

argvProcessor.command(
  'read',
  'Description of note',
  {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
  },
  (argv) => {
    readNotes(argv.title)
  }
)

 .help()
  .argv;

