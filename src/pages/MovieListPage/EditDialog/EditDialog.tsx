import React from "react";
import Dialog from "../../../components/Dialog/Dialog";
import MovieForm from "../../../components/MovieForm/MovieForm";
import type { Movie } from "../../../models/movie.type";

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
      title={`Edit ${movie?.title}`}
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
