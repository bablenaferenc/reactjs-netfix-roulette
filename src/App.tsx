import { useState } from "react";
import "./App.css";
import Counter from "./components/Counter";
import GenreSelect from "./components/GenreSelect";
import SearchForm from "./components/SearchForm";

function App() {
  const count = 0;
  const [selected, setSelected] = useState<string | undefined>("Action");

  return (
    <>
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
    </>
  );
}

export default App;
