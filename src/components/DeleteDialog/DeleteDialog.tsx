import React from "react";
import Dialog from "../Dialog/Dialog";
import type { Movie } from "../../models/movie.type";

type MovieDetailsProps = {
  movie: Movie | null;
  onClose: (movie: Movie | null) => void;
};

const DeleteDialog: React.FC<MovieDetailsProps> = ({ movie, onClose }) => {
  return (
    <Dialog
      isOpen
      onClose={() => {
        onClose(null);
      }}
      title={`Delete ${movie?.name}`}
    >
      <p>Are you sure you want to delete {movie?.name}?</p>
      <button onClick={() => onClose(movie)}>Yes, Delete</button>
      <button onClick={() => onClose(null)}>Cancel</button>
    </Dialog>
  );
};

export default DeleteDialog;
