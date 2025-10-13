import React from "react";
import Dialog from "../../../components/Dialog/Dialog";
import MovieForm from "../../../components/MovieForm/MovieForm";
import { useLocation, useNavigate } from "react-router-dom";
import type { Movie } from "../../../models/movie.type";
import axios from "axios";

const AddMovieForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = (movie: Movie) => {
    const controller = new AbortController();
    console.log("Genre", typeof movie.genres);
    let genres: string[] = movie.genres;

    if (typeof movie.genres === "string") {
      genres = (movie.genres as unknown as string)
        .split(", ")
        .map((el) => el.trim());
    }

    const fetchMovie = async () => {
      try {
        const response = await axios.post(
          "http://localhost:4000/movies",
          {
            poster_path: movie.poster_path,
            title: movie.title,
            release_date: movie.release_date,
            genres: genres,
            vote_average: Number(movie.vote_average),
            runtime: Number(movie.runtime),
            overview: movie.overview,
          },
          {
            signal: controller.signal,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        navigate("/details/" + response.data.id + location.search);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Previous request cancelled.");
        } else {
          console.error("Error fetching movie:", error);
        }
      }
    };

    fetchMovie();

    return () => {
      controller.abort();
    };
  };

  return (
    <Dialog
      isOpen
      onClose={() => navigate("/" + location.search)}
      title={`Add a new movie`}
    >
      <MovieForm movie={null} formSubmit={handleSubmit} />
    </Dialog>
  );
};

export default AddMovieForm;
