import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import GenreSelect from "../../../components/GenreSelect";
import { SortControl } from "../../../components/SortControl/SortControl";
import SearchForm from "../../../components/SearchForm";
import "./query-form.css";

function QueryForm() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get("search"));
  const [activeGenre, setActiveGenre] = useState<string | null>(
    searchParams.get("genre") || ""
  );
  const [sortCriterion, setSortCriterion] = useState<string>(
    searchParams.get("sort") || ""
  );

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setSearchParams({
      search: value,
      sort: sortCriterion,
      genre: activeGenre || "",
    });
  };

  const handleSort = (value: string) => {
    setSortCriterion(value);
    setSearchParams({
      search: searchQuery || "",
      sort: value,
      genre: activeGenre || "",
    });
  };

  const handleGenre = (value: string) => {
    setActiveGenre(value);
    setSearchParams({
      search: searchQuery || "",
      sort: sortCriterion,
      genre: value,
    });
  };

  return (
    <div className="query-form">
      <SearchForm initialQuery={searchQuery || ""} onSearch={handleSearch} />
      <GenreSelect
        genres={["Action", "Comedy", "Drama", "Romance"]}
        selectedGenre={activeGenre}
        onSelect={handleGenre}
      />
      <SortControl current={sortCriterion} onSelect={handleSort} />
    </div>
  );
}

export default QueryForm;
