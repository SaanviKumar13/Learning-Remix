import fs from 'fs/promises';
import { Note } from '~/components/NoteList';

export async function getStoredNotes(){
    const fileContent= await fs.readFile('notes.json', {encoding:'utf-8'});
    const data=JSON.parse(fileContent); //converts text recieved into js object
    const storedNotes=data.notes??[];
    return storedNotes;

}

export function storeNotes(notes: Note){
    return fs.writeFile('notes.json',JSON.stringify({notes}))
}