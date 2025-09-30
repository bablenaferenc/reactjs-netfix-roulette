import React, { useState } from "react";
import "./movie-form.css";
import type { Movie } from "../../models/movie.type";

export interface MovieFormProps {
  movie: Movie;
  formSubmit: (data: Movie) => void;
}

const MovieForm: React.FC<MovieFormProps> = ({
  movie,
  formSubmit,
}: MovieFormProps) => {
  const [formData, setFormData] = useState<Movie>(movie);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      ...movie,
      ...formData,
    };

    formSubmit(data);
  };

  return (
    <form className="movie-form" onSubmit={handleSubmit}>
      <div>
        <label>
          Title
          <input
            type="text"
            defaultValue={movie.title ?? ""}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </label>
        <label>
          Release date ({movie.release_date as string})
          <input
            type="date"
            defaultValue={
              movie.release_date ? (movie.release_date as string) : ""
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                release_date: e.target.value,
              })
            }
          />
        </label>
      </div>
      <div>
        <label>
          Image URL
          <input
            type="text"
            defaultValue={movie.poster_path ?? ""}
            onChange={(e) =>
              setFormData({ ...formData, poster_path: e.target.value })
            }
          />
        </label>
        <label>
          vote_average
          <input
            type="number"
            defaultValue={movie.vote_average ?? 0}
            min={0}
            max={10}
            step={0.1}
            onChange={(e) =>
              setFormData({
                ...formData,
                vote_average: parseFloat(e.target.value),
              })
            }
          />
        </label>
      </div>
      <div>
        <label>
          Genres ({movie.genres.join(", ")})
          <input
            type="text"
            defaultValue={movie.genres.join(", ")}
            onChange={(e) =>
              setFormData({
                ...formData,
                genres: e.target.value.split(",").map((g) => g.trim()),
              })
            }
          />
        </label>
        <label>
          Runtime
          <input
            type="text"
            defaultValue={movie.runtime ?? ""}
            onChange={(e) =>
              setFormData({ ...formData, runtime: e.target.value })
            }
          />
        </label>
      </div>
      <div className="description">
        <label>
          Description
          <textarea
            defaultValue={movie.overview ?? ""}
            onChange={(e) =>
              setFormData({ ...formData, overview: e.target.value })
            }
          />
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
