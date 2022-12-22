import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { trpc } from "../utils/trpc";

const schema = z.object({
  mediaType: z.enum(["movie", "tv"]),
  name: z.string(),
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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form
      onSubmit={handleSubmit(({ name, genre, mediaType }) => {
        mutation.mutate({ name, genre, mediaType });
      })}
      className="flex flex-col space-y-3 rounded bg-slate-900 p-5"
    >
      <div className="flex flex-row space-x-3">
        <label
          htmlFor="mediaType"
          className="flex flex-col justify-center space-y-1"
        >
          <span className="font-bold">Media Type</span>
          <select
            id="mediaType"
            className="p-0.5 dark:bg-slate-700"
            {...register("mediaType")}
          >
            <option value="movie">Movie</option>
            <option value="tv">TV</option>
          </select>
        </label>

        <label
          htmlFor="name"
          className="flex grow flex-col justify-center space-y-1"
        >
          <span className="font-bold">Name</span>
          <input
            type="text"
            className="border-b-2 border-black bg-transparent outline-none ring-0 transition-colors focus:border-sky-500 dark:border-white"
            {...register("name")}
          />
        </label>
      </div>

      <label htmlFor="genre" className="flex flex-col justify-center space-y-1">
        <span className="font-bold">Genre</span>
        <select
          id="mediaGenre"
          className="px-0.5 py-1 dark:bg-slate-700"
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
