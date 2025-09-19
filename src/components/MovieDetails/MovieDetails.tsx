import React from "react";
import "./movie-details.css";

export type Movie = {
  id: string | number;
  imageUrl: string;
  name: string;
  releaseYear: number;
  genres: string[];
  rating: number;
  duration: string;
  description: string;
};

type MovieDetailsProps = {
  movie: Movie;
  onClick: (movie: Movie) => void;
};

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie, onClick }) => {
  return (
    <div className="movie-details" onClick={() => onClick(movie)}>
      <img className="poster" src={movie.imageUrl} alt={movie.name} />
      <div className="info">
        <h2 className="title">
          {movie.name}
          <span className="rating">{movie.rating}</span>
        </h2>
        <div className="genres">{movie.genres.join(" & ")}</div>
        <div className="meta">
          <span>{movie.releaseYear}</span>
          <span>{movie.duration}</span>
        </div>
        <div className="description">{movie.description}</div>
      </div>
    </div>
  );
};

export default MovieDetails;
