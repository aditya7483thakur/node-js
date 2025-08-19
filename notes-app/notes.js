const fs = require('fs')

const addNote = (title,body)=>{
    const notes = loadNotes()
    const duplicateNote = notes.find((note)=>note.title===title)

    if(!duplicateNote){
        notes.push({
            title,body
        })
        saveNotes(notes);
        console.log("Note added !")
    }else{
        console.log("Title already taken !")
    }

}

const removeNote = (title)=>{
    const notes = loadNotes();

    const notesToKeep = notes.filter((note)=>{
        return note.title !== title
    })

    if(notesToKeep.length === notes.length){
        console.log("No note with such title found !")
    }else{
        saveNotes(notesToKeep)
        console.log("Note has been removed !")
    }
}

const readNotes = (title)=>{
    const notes = loadNotes()
    const foundNote = notes.find((note)=>note.title===title)

    if(!foundNote){
        console.log("No such note found !")
    }else{
        console.log("Here is the note ->");
        console.log(foundNote);
    }

}

const listNotes = ()=>{
    const notes = loadNotes();
    notes.map((note)=>console.log(note.title))
}

const saveNotes = (notes)=>{
    const jsonData = JSON.stringify(notes)
    fs.writeFileSync('./notes.json',jsonData)
}

const loadNotes = ()=>{
    try {
        const dataBuffer = fs.readFileSync('./notes.json')
        const jsonData = dataBuffer.toString()
        return JSON.parse(jsonData)
    } catch (error) {
        return []
    }
}

module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNotes
}