import React from "react";
import "./movie-form.css";
import type { Movie } from "../../models/movie.type";
import { useForm, type SubmitHandler } from "react-hook-form";

export interface MovieFormProps {
  movie: Movie | null;
  formSubmit: (data: Movie) => void;
}

const MovieForm: React.FC<MovieFormProps> = ({
  movie,
  formSubmit,
}: MovieFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Movie>();

  const onSubmits: SubmitHandler<Movie> = (data) => {
    const dataWithId = { ...data, id: movie ? movie.id : 0 };
    formSubmit(dataWithId);
  };

  console.log(watch("title"));

  return (
    <form className="movie-form" onSubmit={handleSubmit(onSubmits)}>
      <div>
        <label>
          Title
          <input
            type="text"
            defaultValue={movie?.title ?? ""}
            {...register("title", { required: "This field is required" })}
            placeholder="The title of the movie"
          />
          {errors.title && <p>{errors.title.message}</p>}
        </label>
        <label>
          Release date ({movie?.release_date as string})
          <input
            type="date"
            defaultValue={
              movie?.release_date ? (movie?.release_date as string) : ""
            }
            {...register("release_date", {
              required: "This field is required",
            })}
          />
          {errors.release_date && <p>{errors.release_date.message}</p>}
        </label>
      </div>
      <div>
        <label>
          Image URL
          <input
            type="text"
            defaultValue={movie?.poster_path ?? ""}
            {...register("poster_path", { required: "This field is required" })}
          />
          {errors.poster_path && <p>{errors.poster_path.message}</p>}
        </label>
        <label>
          vote_average
          <input
            type="number"
            defaultValue={movie?.vote_average ?? 0}
            min={0}
            max={10}
            step={0.1}
            {...register("vote_average", {
              required: "This field is required",
            })}
          />
          {errors.vote_average && <p>{errors.vote_average.message}</p>}
        </label>
      </div>
      <div>
        <label>
          Genres ({movie?.genres.join(", ")})
          <input
            type="text"
            defaultValue={movie?.genres.join(", ")}
            {...register("genres", { required: "This field is required" })}
          />
          {errors.genres && <p>{errors.genres.message}</p>}
        </label>
        <label>
          Runtime
          <input
            type="text"
            defaultValue={movie?.runtime ?? ""}
            {...register("runtime", { required: "This field is required" })}
          />
          {errors.runtime && <p>{errors.runtime.message}</p>}
        </label>
      </div>
      <div className="description">
        <label>
          Description
          <textarea
            defaultValue={movie?.overview ?? ""}
            {...register("overview", { required: "This field is required" })}
          />
          {errors.overview && <p>{errors.overview.message}</p>}
        </label>
      </div>

      <div className="buttons">
        <button className="reset" type="reset">
          Reset
        </button>
        <button className="submit" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default MovieForm;
