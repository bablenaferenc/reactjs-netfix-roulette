import React from "react";
import Dialog from "../Dialog/Dialog";
import MovieForm from "../MovieForm/MovieForm";
import type { Movie } from "../../models/movie.type";

type MovieDetailsProps = {
  movie: Movie | null;
  onClose: (movie: Movie | null) => void;
};

const EditDialog: React.FC<MovieDetailsProps> = ({ movie, onClose }) => {
  return (
    <Dialog
      isOpen
      onClose={() => {
        onClose(null);
      }}
      title={`Edit ${movie?.name}`}
    >
      {movie && (
        <MovieForm
          movie={movie}
          formSubmit={(changedMovie) => onClose(changedMovie)}
        />
      )}
    </Dialog>
  );
};

export default EditDialog;
