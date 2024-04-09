export default function NewNote() {
  return (
    <>
      <div className="w-[40vw] flex flex-col">
        <form
          method="post"
          className="p-5 rounded-2xl bg-gray-50 shadow-box-shadow"
        >
          <p>
            <label
              htmlFor="title"
              className="text-gray-600 text-xl font-semibold block text-center "
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="A name for your note please :)"
              className="w-full p-3 rounded-lg my-3 text-xs md:text-base"
              required
            />
          </p>
          <p>
            <label
              htmlFor="content"
              className="text-gray-600 text-xl font-semibold block text-center"
            >
              Content
            </label>
            <textarea
              name="content"
              rows={7}
              placeholder="What's your note about?"
              className="w-full p-3 rounded-lg my-3 text-xs  md:text-base"
              required
            />
          </p>
          <div>
            <button className="p-2 rounded-lg text-gray-700 bg-gray-100 hover:text-gray-200 hover:bg-gray-700">
              Add Note
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
