const fs = require('fs'); 

const getNotes = function () {
    return 'Your notes...'; 
}

const removeNote = function (title) {
    console.log(`removed note title ${title}`); 
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
        console.log('New note added!'); 
    } else {
        console.log('Note title taken!'); 
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
    getNotes   : getNotes,
    addNote    : addNote, 
    removeNote : removeNote
}; 