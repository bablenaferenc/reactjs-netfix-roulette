import { useEffect, useState } from "react";
import MovieDetails from "../../../components/MovieDetails/MovieDetails";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import type { Movie } from "../../../models/movie.type";

function ShowMovie() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/movies/" + movieId,
          {
            params: {},
            signal: controller.signal,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setSelectedMovie(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Previous request cancelled.");
        } else {
          console.error("Error fetching movie:", error);
        }
      }
    };

    fetchMovie();

    return () => {
      controller.abort();
    };
  }, [movieId]);

  return (
    <MovieDetails
      movie={selectedMovie}
      onClick={() => navigate("/" + location.search)}
    />
  );
}

export default ShowMovie;
