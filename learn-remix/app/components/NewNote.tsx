export default function NewNote() {
  return (
    <>
      <div className="absolute left-24 m-5 md:left-52 lg:left-96 xl:ml-56">
        <form
          method="post"
          className="p-5 rounded-2xl bg-pink-50 shadow-box-shadow"
        >
          <p>
            <label
              htmlFor="title"
              className="text-pink-600 text-xl font-semibold block text-center "
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
              className="text-pink-600 text-xl font-semibold block text-center"
            >
              Content
            </label>
            <textarea
              name="content"
              rows={7}
              placeholder="What's your note about?"
              className="w-full md:w-80 p-3 rounded-lg my-3 text-xs  md:text-base"
              required
            />
          </p>
          <div>
            <button className="p-2 rounded-lg text-pink-700 bg-pink-100 hover:text-pink-200 hover:bg-pink-700">
              Add Note
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
