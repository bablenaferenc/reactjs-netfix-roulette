import { Routes, Route } from "react-router-dom";
import "./App.css";
import MovieListPage from "./pages/MovieListPage/MovieListPage";
import ShowMovie from "./pages/MovieListPage/ShowMovieDetails/ShowMovieDetails";
import QueryForm from "./pages/MovieListPage/QueryForm/QueryForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MovieListPage />}>
        <Route path="/" element={<QueryForm />} />
        <Route path="/details/:movieId" element={<ShowMovie />} />
      </Route>
    </Routes>
  );
}

export default App;
