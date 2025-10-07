import { useEffect, useState } from "react";
import MovieTile from "../../components/MovieTile/MovieTile";
import EditDialog from ".//EditDialog/EditDialog";
import DeleteDialog from "./DeleteDialog/DeleteDialog";
import type { Movie } from "../../models/movie.type";
import axios from "axios";
import { Outlet, useLocation, useSearchParams } from "react-router-dom";

function MovieListPage() {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [movies, setMovies] = useState<Movie[]>([]);

  const [showDialog, setShowDialog] = useState(false);
  const [movieForEdit, setMovieForEdit] = useState<Movie | null>(null);
  const [movieForDelete, setMovieForDelete] = useState<Movie | null>(null);

  const closeAllDialogs = () => {
    setShowDialog(false);
    setMovieForDelete(null);
    setMovieForEdit(null);
  };

  const handleEdit = (movie: Movie | null) => {
    closeAllDialogs();
    console.log("Edit movie:", movie);
  };

  const handleDelete = (movie: Movie | null) => {
    closeAllDialogs();
    console.log("Delete movie", movie);
  };

  const onOpenEditDialog = (movie: Movie) => {
    setMovieForEdit(movie);
    setShowDialog(true);
  };

  const onOpenDeleteDialog = (movie: Movie) => {
    setMovieForDelete(movie);
    setShowDialog(true);
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:4000/movies", {
          params: {
            search: searchParams.get("search"),
            searchBy: "title",
            sortBy: searchParams.get("sort"),
            filter: searchParams.get("genre"),
            limit: 50,
          },
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.data !== movies) {
          setMovies(response.data.data);
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Previous request cancelled.");
        } else {
          console.error("Error fetching movies:", error);
        }
      }
    };

    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [location]);

  return (
    <div>
      <div>
        <Outlet />
      </div>
      <main>
        {movies &&
          movies.map((movie) => (
            <MovieTile
              key={movie.id}
              movie={movie}
              onEdit={(movie) => onOpenEditDialog(movie)}
              onDelete={(movie) => onOpenDeleteDialog(movie)}
            />
          ))}
      </main>

      {showDialog && movieForEdit && (
        <EditDialog movie={movieForEdit} onClose={handleEdit}></EditDialog>
      )}
      {showDialog && movieForDelete && (
        <DeleteDialog
          movie={movieForDelete}
          onClose={handleDelete}
        ></DeleteDialog>
      )}
    </div>
  );
}

export default MovieListPage;
