import React from "react";
import "./movie-details.css";
import type { Movie } from "../../models/movie.type";

type MovieDetailsProps = {
  movie: Movie;
  onClick: (movie: Movie) => void;
};

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie, onClick }) => {
  const genres = movie.genres.join(" & ");
  return (
    <div className="movie-details" onClick={() => onClick(movie)}>
      <img className="poster" src={movie.poster_path} alt={movie.title} />
      <div className="info">
        <h2 className="title">
          {movie.title}
          <span className="vote_average">{movie.vote_average}</span>
        </h2>
        <div className="genres">{genres}</div>
        <div className="meta">
          <span>{movie.release_date as string}</span>
          <span>{movie.runtime}</span>
        </div>
        <div className="description">{movie.overview}</div>
      </div>
    </div>
  );
};

export default MovieDetails;
