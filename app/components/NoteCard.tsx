import { Form } from "@remix-run/react";

interface NoteCardProps {
  id: string;
  title: string;
  content: string;
}

export default function NoteCard({ id, title, content }: NoteCardProps) {
  return (
    <div className="w-[90vw] md:w-[30vw] p-6 bg-gray-100 border border-gray-200 rounded-lg shadow">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
        {title}
      </h5>

      <p className="mb-3 font-normal text-gray-700">{content}</p>
      <Form method="post">
        <input type="hidden" name="noteId" value={id} />
        <button type="submit">
          <img src="bin-icon.svg" alt="delete" className="w-5 h-5" />
        </button>
      </Form>
    </div>
  );
}
