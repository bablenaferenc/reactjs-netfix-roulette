import React, { useState } from "react";
import "./movie-tile.css";
import type { Movie } from "../../models/movie.type";
import { useLocation, useNavigate } from "react-router-dom";

interface MovieTileProps {
  movie: Movie;
}

const MovieTile: React.FC<MovieTileProps> = ({ movie }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const openDetails = () => {
    navigate("/details/" + movie.id + location.search);
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen((open) => !open);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen(false);
    navigate(`/${movie.id}/edit` + location.search);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen(false);
  };

  return (
    <div
      role="group"
      className={"movie-tile"}
      aria-label={"Open movie details " + movie.title}
      onClick={openDetails}
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
