import type { Movie } from "../MovieDetails/MovieDetails";
import React, { useState } from "react";
import "./movie-form.css";

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
            defaultValue={movie.name ?? ""}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </label>
        <label>
          Release date ({movie.releaseYear})
          <input
            type="date"
            defaultValue={movie.releaseYear ? movie.releaseYear + "-01-01" : ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                releaseYear: Number(e.target.value.split("-")[0]),
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
            defaultValue={movie.imageUrl ?? ""}
            onChange={(e) =>
              setFormData({ ...formData, imageUrl: e.target.value })
            }
          />
        </label>
        <label>
          Rating
          <input
            type="number"
            defaultValue={movie.rating ?? 0}
            min={0}
            max={10}
            step={0.1}
            onChange={(e) =>
              setFormData({ ...formData, rating: parseFloat(e.target.value) })
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
            defaultValue={movie.duration ?? ""}
            onChange={(e) =>
              setFormData({ ...formData, duration: e.target.value })
            }
          />
        </label>
      </div>
      <div className="description">
        <label>
          Description
          <textarea
            defaultValue={movie.description ?? ""}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
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
