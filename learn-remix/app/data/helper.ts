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

export async function deleteNote(id: string) {
      const fileContent = await fs.readFile('notes.json', { encoding: 'utf-8' });
      const data = JSON.parse(fileContent);
      const updatedNotes = data.notes.filter((note: Note) => note.id !== id);
      await fs.writeFile('notes.json', JSON.stringify({ notes: updatedNotes }));
  }
  