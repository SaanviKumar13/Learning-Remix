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
    <div className="flex flex-row gap-5 flex-wrap items-center justify-center m-5">
      {notes.map((note: Note, index: number) => (
        <div
          key={index}
          className="bg-gray-100 h-44 overflow-y-scroll w-[80vw] md:w-[40vw] lg:w-[35vw] p-5 rounded-lg m-2"
        >
          <h1 className="text-gray-800 text-center font-semibold text-xl">
            {note.title}
          </h1>
          <p className="font-extralight text-gray-800">{note.content}</p>
        </div>
      ))}
    </div>
  );
}
