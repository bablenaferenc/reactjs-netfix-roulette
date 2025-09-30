import { useEffect, useState } from "react";
import GenreSelect from "../../components/GenreSelect";
import SearchForm from "../../components/SearchForm";
import MovieTile from "../../components/MovieTile/MovieTile";
import MovieDetails from "../../components/MovieDetails/MovieDetails";
import EditDialog from "../../components/EditDialog/EditDialog";
import DeleteDialog from "../../components/DeleteDialog/DeleteDialog";
import { SortControl } from "../../components/SortControl/SortControl";
import type { Movie } from "../../models/movie.type";
import axios from "axios";

function MovieListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeGenre, setActiveGenre] = useState<string | null>("Action");
  const [sortCriterion, setSortCriterion] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

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

  const openDialog = (mode: string, movie: Movie) => {
    if (mode === "edit") {
      setMovieForEdit(movie);
    }

    if (mode === "delete") {
      setMovieForDelete(movie);
    }

    setShowDialog(true);
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:4000/movies", {
          params: {
            search: searchQuery,
            searchBy: "title",
            sortBy: sortCriterion,
            filter: activeGenre,
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
  }, [searchQuery, activeGenre, sortCriterion]);

  return (
    <>
      {selectedMovie ? (
        <MovieDetails
          movie={selectedMovie}
          onClick={() => setSelectedMovie(null)}
        />
      ) : (
        <div>Menu</div>
      )}
      <SearchForm initialQuery={searchQuery} onSearch={setSearchQuery} />
      <GenreSelect
        genres={["Action", "Comedy", "Drama", "Romance"]}
        selectedGenre={activeGenre}
        onSelect={(genre) => {
          setActiveGenre(genre);
        }}
      />
      <SortControl current={sortCriterion} onSelect={setSortCriterion} />
      <main>
        {movies &&
          movies.map((movie) => (
            <MovieTile
              key={movie.id}
              movie={movie}
              onClick={(movie) => setSelectedMovie(movie as Movie)}
              onEdit={(movie) => openDialog("edit", movie)}
              onDelete={(movie) => openDialog("delete", movie)}
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
    </>
  );
}

export default MovieListPage;
