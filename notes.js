let     fs = require('fs'),  
     chalk = require('chalk');

const removeNote = function (title) {

    // loading all notes
    notes = loadNotes(); 

    // filtering the notes with matched title
    const notesToKeep = notes.filter(function(note){
        return note.title !== title; 
    }); 
    
    if(notes.length > notesToKeep.length){
        console.log(chalk.green(`note with title: ${title} removed...`)); 
        saveNotes(notesToKeep); 
    }
    else {
        console.log(chalk.red(`No such note found...`)); 
    }
}

const addNote = function (title, body) {

    // load notes
    const notes = loadNotes(); 

    // checking for duplicates 
    const duplicateNotes = notes.filter(function (note) {
        return note.title === title; 
    }); 

    // duplicate does not exist 
    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        }); 
        saveNotes(notes); 
        console.log(chalk.green('New note added!')); 
    } else {
        console.log(chalk.red('Note title taken...')); 
    }
}

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes); 
    fs.writeFileSync('notes.json', dataJSON); 
}

const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json'); 
        const dataJSON = dataBuffer.toString(); 
        return JSON.parse(dataJSON); 
    } catch (e) {
        return []; 
    }
}

module.exports = {
    addNote    : addNote, 
    removeNote : removeNote
}; 