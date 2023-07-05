export default function NewNote() {
  return (
    <>
      <div className="absolute left-1/3 w-1/2">
        <form
          method="post"
          className="p-5 rounded-2xl bg-pink-50 shadow-box-shadow"
        >
          <p>
            <label
              htmlFor="title"
              className="text-pink-600 text-xl font-semibold block text-center"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="A name for your note please :)"
              className="w-full p-3 rounded-lg my-3"
              required
            />
          </p>
          <p>
            <label
              htmlFor="content"
              className="text-pink-600 text-xl font-semibold block text-center"
            >
              Content
            </label>
            <textarea
              name="content"
              rows={7}
              placeholder="What's your note about?"
              className="w-full p-3 rounded-lg my-3"
              required
            />
          </p>
          <div>
            <button className="relative left-28 p-2 rounded-lg text-pink-700 bg-pink-100 hover:text-pink-200 hover:bg-pink-700">
              Add Note
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
