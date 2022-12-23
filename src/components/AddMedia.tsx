import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { trpc } from "../utils/trpc";

const schema = z.object({
  mediaType: z.enum(["Movie", "TV"]),
  name: z.string().min(1),
  genre: z.enum([
    "Drama",
    "Comedy",
    "Horror",
    "Animated",
    "Action",
    "Adventure",
    "Sadge",
    "JapaneseAnimation",
  ]),
});

const AddMedia: React.FC = () => {
  const context = trpc.useContext();
  const mutation = trpc.media.newMedia.useMutation({
    onSuccess() {
      context.media.getAll.invalidate();
      reset();
    },
  });
  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form
      onSubmit={handleSubmit(({ name, genre, mediaType }) => {
        mutation.mutate({ name, genre, mediaType });
      })}
      className="flex flex-col space-y-7 rounded bg-slate-900 p-5"
    >
      <div className="flex flex-col text-center">
        <h3 className="text-2xl font-bold">Add Media</h3>
        <span className="text-xs font-extrabold uppercase text-gray-400">
          Add stuff to watch to the list!
        </span>
      </div>
      <div className="space-y-5">
        <div className="flex flex-row space-x-5">
          <label
            htmlFor="mediaType"
            className="flex flex-col justify-center space-y-1"
          >
            <span className="font-bold">Media Type</span>
            <select
              id="mediaType"
              className="rounded p-0.5 py-1 dark:bg-slate-700"
              {...register("mediaType")}
            >
              <option value="Movie">Movie</option>
              <option value="TV">TV</option>
            </select>
          </label>

          <label
            htmlFor="genre"
            className="flex flex-col justify-center space-y-1"
          >
            <span className="font-bold">Genre</span>
            <select
              id="mediaGenre"
              className="rounded px-0.5 py-1 dark:bg-slate-700"
              {...register("genre")}
            >
              <option value="Drama">Drama</option>
              <option value="Comedy">Comedy</option>
              <option value="Horror">Horror</option>
              <option value="Animated">Animated</option>
              <option value="Action">Action</option>
              <option value="Adventure">Adventure</option>
              <option value="Sadge">Sadge</option>
              <option value="JapaneseAnimation">Japanese Animation</option>
            </select>
          </label>
        </div>

        <label
          htmlFor="name"
          className="flex grow flex-col justify-center space-y-1"
        >
          <span className="font-bold">Name</span>
          <input
            type="text"
            className="border-b-2 border-black bg-transparent py-1 outline-none ring-0 transition-colors focus:border-sky-500 dark:border-white"
            {...register("name")}
          />
        </label>
      </div>

      <div className="flex grow-0 items-center justify-center">
        <input
          type="submit"
          className="grow-0 rounded bg-green-500 py-2 px-5 font-bold"
          value={"Add"}
        />
      </div>
    </form>
  );
};

export default AddMedia;
