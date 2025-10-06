import React, { useState } from "react";
import "./movie-tile.css";
import type { Movie } from "../../models/movie.type";

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
      aria-label={"Open movie details " + movie.title}
      onClick={() => onClick(movie)}
    >
      <img src={movie.poster_path} alt={movie.title} />
      <div className="movie-info">
        <span className="movie-title">{movie.title}</span>
        <span className="movie-year">{movie.release_date as string}</span>
      </div>
      <div>{movie.genres.join(", ")}</div>
      <button
        className="menu-btn"
        type="button"
        name="open-menu"
        aria-label={"Open menu " + movie.title}
        onClick={handleMenuClick}
      >
        &#8942;
      </button>
      {menuOpen && (
        <div className="menu-popup">
          <button
            className="menu-item"
            aria-label={"Edit " + movie.title}
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="menu-item delete"
            aria-label={"Delete " + movie.title}
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
