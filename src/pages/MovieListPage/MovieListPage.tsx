import { useEffect, useState } from "react";
import MovieTile from "../../components/MovieTile/MovieTile";
import type { Movie } from "../../models/movie.type";
import axios from "axios";
import { Outlet, useLocation, useSearchParams } from "react-router-dom";

function MovieListPage() {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [movies, setMovies] = useState<Movie[]>([]);

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
          movies.map((movie) => <MovieTile key={movie.id} movie={movie} />)}
      </main>
    </div>
  );
}

export default MovieListPage;
