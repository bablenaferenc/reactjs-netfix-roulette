import { useState } from "react";
import "./App.css";
import GenreSelect from "./components/GenreSelect";
import SearchForm from "./components/SearchForm";
import MovieTile from "./components/MovieTile/MovieTile";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import EditDialog from "./components/EditDialog/EditDialog";
import DeleteDialog from "./components/DeleteDialog/DeleteDialog";
import type { Movie } from "./models/movie.type";

function App() {
  const [selected, setSelected] = useState<string | null>("Action");

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const [showDialog, setShowDialog] = useState(false);

  const [movieForEdit, setMovieForEdit] = useState<Movie | null>(null);
  const [movieForDelete, setMovieForDelete] = useState<Movie | null>(null);

  const movies: Movie[] = [
    {
      id: 1,
      name: "Inception",
      genres: ["Action"],
      imageUrl: "https://placehold.co/600x400",
      releaseYear: 2010,
      rating: 8.8,
      duration: "2h 28m",
      description: "A mind-bending thriller by Christopher Nolan.",
    },
    {
      id: 2,
      name: "The Godfather",
      genres: ["Drama"],
      imageUrl: "https://placehold.co/600x400",
      releaseYear: 1972,
      rating: 9.2,
      duration: "2h 55m",
      description: "A crime film directed by Francis Ford Coppola.",
    },
    {
      id: 3,
      name: "Toy Story",
      genres: ["Animation"],
      imageUrl: "https://placehold.co/600x400",
      releaseYear: 1995,
      rating: 8.3,
      duration: "1h 21m",
      description: "A story about the adventures of a group of toys.",
    },
  ];

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
      <SearchForm initialQuery="" onSearch={(query) => console.log(query)} />
      <GenreSelect
        genres={["Action", "Comedy", "Drama"]}
        selectedGenre={selected}
        onSelect={(genre) => {
          setSelected(genre);
          console.log("Selected:", genre);
        }}
      />
      <main>
        {movies.map((movie) => (
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

export default App;
