import axios from "axios";
import { useState } from "react";
import SearchResults from "./SearchResults";

const SearchBarHome = (props) => {
  const [searchInput, setSearchInput] = useState("");
  const [movies, setMovies] = useState("");

  const baseURL = `https://api.themoviedb.org/3/`;

  const handleChange = (e) => {
    e.preventDefault();
    const searchTerm = e.target.value.trim().toLowerCase();
    setSearchInput(searchTerm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `${baseURL}search/keyword?api_key=4af29920e903cef08f533ae3feff4860&query=${searchInput}&page=1`
      )
      .then((res) => res.json)
      .then((json) => setMovies(json.results))
      .catch((err) => console.error(console.error(err)));
  };

  return (
    <div className="search-bar-home">
      <input
        type="text"
        className="search-field"
        onChange={handleChange}
        placeholder="What would you like to watch?"
      />
      <button type="submit" onClick={handleSubmit}>
        Search
      </button>
    </div>
  );
};

export default SearchBarHome;
