import React, { useState } from "react";
import "./movie-tile.css";

export type Movie = {
  id: string | number;
  imageUrl: string;
  name: string;
  releaseYear: number;
  genres: string[];
};

interface MovieTileProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
  onEdit?: (movie: Movie) => void;
  onDelete?: (movie: Movie) => void;
}

const MovieTile: React.FC<MovieTileProps> = ({
  movie,
  onClick,
  onEdit,
  onDelete,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen((open) => !open);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen(false);
    onEdit?.(movie);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen(false);
    onDelete?.(movie);
  };

  return (
    <div
      role="group"
      className={"movie-tile"}
      aria-label={"Open movie details " + movie.name}
      onClick={() => onClick(movie)}
    >
      <img src={movie.imageUrl} alt={movie.name} />
      <div className="movie-info">
        <span className="movie-title">{movie.name}</span>
        <span className="movie-year">{movie.releaseYear}</span>
      </div>
      <div>{movie.genres.join(", ")}</div>
      <button
        className="menu-btn"
        type="button"
        name="open-menu"
        aria-label={"Open menu " + movie.name}
        onClick={handleMenuClick}
      >
        &#8942;
      </button>
      {menuOpen && (
        <div className="menu-popup">
          <button
            className="menu-item"
            aria-label={"Edit " + movie.name}
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="menu-item delete"
            aria-label={"Delete " + movie.name}
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieTile;
