let     fs = require('fs'),  
     chalk = require('chalk');

const getNotes =()=> console.log(`notes go here!`); 

const readNote =(title)=>{
    // loading notes: 
    notes = loadNotes(); 

    const finalNote = notes.filter((note)=> note.title === title); 

    if(finalNote.length > 0){
        finalNote.forEach((note)=> console.log(chalk.blue(note.body))); 
    } else {
        console.log(chalk.bgRed('no such to-do found...')); 
    }
}

const removeNote =(title)=> {
    // loading all notes
    notes = loadNotes(); 

    // filtering the notes with matched title
    const notesToKeep = notes.filter((note)=> note.title !== title ); 

    if(notes.length > notesToKeep.length){
        console.log(chalk.green(`note with title: ${title} removed...`)); 
        saveNotes(notesToKeep); 
    }
    else {
        console.log(chalk.red(`No such note found...`)); 
    }
}

const listNotes =()=>{

    // loading notes 
    notes = loadNotes(); 

    console.log(chalk.bold.yellow(`Your notes: `)); 
    
    // listing all notes
    notes.forEach((note)=>{
            console.log(chalk.bold.magenta(`${note.title}`));
    }); 
}

const addNote = function (title, body) {

    // load notes
    const notes = loadNotes(); 

    // checking for duplicates 
    const duplicateNotes = notes.filter( (note)=> note.title === title ); 

    // duplicate does not exist 
    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body : body
        }); 

        // saving notes to the DB
        saveNotes(notes); 
        console.log(chalk.green('New note added!')); 
    } else {
        console.log(chalk.red('Note title taken...')); 
    }
}

const saveNotes = (notes) => {
    // converting the notes obj into JSON format 
    const dataJSON = JSON.stringify(notes); 

    // writing to the JSON file
    fs.writeFileSync('notes.json', dataJSON); 
}

const loadNotes = ()=> {
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
    removeNote : removeNote, 
    listNotes  : listNotes, 
    readNote   : readNote 
}; 