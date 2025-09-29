import { useState } from "react";
import "./App.css";
import Counter from "./components/Counter";
import GenreSelect from "./components/GenreSelect";
import SearchForm from "./components/SearchForm";
import MovieTile from "./components/MovieTile/MovieTile";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import Dialog from "./components/Dialog/Dialog";
import MovieForm from "./components/MovieForm/MovieForm";

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

function App() {
  const count = 0;
  const [selected, setSelected] = useState<string | undefined>("Action");

  const [selectedMovie, setSelectedMovie] = useState<Movie | undefined>(
    undefined
  );
  const [dialogTitle, setDialogTitle] = useState("");

  const [showDialog, setShowDialog] = useState(false);

  const [movieForEdit, setMovieForEdit] = useState<Movie | undefined>(
    undefined
  );

  const [dialogMode, setDialogMode] = useState<"edit" | "delete" | undefined>(
    undefined
  );

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

  return (
    <>
      {selectedMovie ? (
        <MovieDetails
          movie={selectedMovie}
          onClick={() => setSelectedMovie(undefined)}
        />
      ) : (
        <div>Menu</div>
      )}
      <Counter initialValue={count} />
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
            onEdit={(movie) => {
              setDialogTitle(`Edit ${movie.name}`);
              setShowDialog(true);
              setMovieForEdit(movie as Movie);
              setDialogMode("edit");
            }}
            onDelete={(movie) => {
              setDialogTitle(`Delete ${movie.name}`);
              setShowDialog(true);
              setMovieForEdit(movie as Movie);
              setDialogMode("delete");
            }}
          />
        ))}
      </main>
      <Dialog
        isOpen={showDialog}
        onClose={() => {
          setShowDialog(false);
        }}
        title={dialogTitle}
      >
        {dialogMode === "edit" && movieForEdit && (
          <MovieForm
            movie={movieForEdit}
            formSubmit={(data: Movie) => {
              console.log("Edited movie:", data);
              setShowDialog(false);
            }}
          />
        )}
        {dialogMode === "delete" && movieForEdit && (
          <div>
            <p>Are you sure you want to delete {movieForEdit.name}?</p>
            <button
              onClick={() => {
                console.log("Deleted movie:", movieForEdit);
                setShowDialog(false);
              }}
            >
              Yes, Delete
            </button>
            <button onClick={() => setShowDialog(false)}>Cancel</button>
          </div>
        )}
      </Dialog>
    </>
  );
}

export default App;
