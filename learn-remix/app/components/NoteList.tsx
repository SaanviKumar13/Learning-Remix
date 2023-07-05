export type Note = {
  id: number;
  title: string;
  content: string;
};

export interface NoteType {
  notes: Note[];
}

export default function NoteList({ notes }: NoteType) {
  return (
    <>
      <div className="flex flex-row gap-5 flex-wrap absolute top-3/4">
        {notes.map((note: Note, index: number) => (
          <div className="bg-pink-100 h-64 w-44 p-5 rounded-lg m-2">
            <h1 className="text-pink-700 text-center font-semibold text-xl">
              {note.title}
            </h1>
            <p className="font-extralight">{note.content}</p>
            {/* <button className="font-extralight text-xs">Delete Note</button> */}
          </div>
        ))}
      </div>
    </>
  );
}
