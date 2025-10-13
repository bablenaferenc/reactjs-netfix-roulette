import { useState } from "react";
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import GenreSelect from "../../../components/GenreSelect";
import { SortControl } from "../../../components/SortControl/SortControl";
import SearchForm from "../../../components/SearchForm";
import "./query-form.css";

function QueryForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState(searchParams.get("search"));

  const getGenre = (value: string | null): string => {
    if (!value || value === "All") return "";

    return value;
  };
  const [activeGenre, setActiveGenre] = useState<string | null>(
    getGenre(searchParams.get("genre"))
  );
  const [sortCriterion, setSortCriterion] = useState<string>(
    searchParams.get("sort") || ""
  );

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setSearchParams({
      search: value,
      sort: sortCriterion,
      genre: getGenre(activeGenre),
    });
  };

  const handleSort = (value: string) => {
    setSortCriterion(value);
    setSearchParams({
      search: searchQuery || "",
      sort: value,
      genre: getGenre(activeGenre),
    });
  };

  const handleGenre = (value: string) => {
    setActiveGenre(value);
    setSearchParams({
      search: searchQuery || "",
      sort: sortCriterion,
      genre: getGenre(value),
    });
  };

  return (
    <div className="query-form">
      <div className="space-between">
        <NavLink to="/">
          <strong>netflix</strong>roulette
        </NavLink>
        <button
          onClick={() => navigate("/new" + location.search)}
          className="add-movie"
        >
          + Add movie
        </button>
      </div>
      <SearchForm initialQuery={searchQuery || ""} onSearch={handleSearch} />
      <div className="space-between">
        <GenreSelect
          genres={["All", "Action", "Comedy", "Drama", "Romance"]}
          selectedGenre={activeGenre}
          onSelect={handleGenre}
        />
        <SortControl current={sortCriterion} onSelect={handleSort} />
      </div>
      <Outlet />
    </div>
  );
}

export default QueryForm;
