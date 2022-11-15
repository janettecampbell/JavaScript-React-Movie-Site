import { useState } from "react";
import searchIcon from "../images/search-icon.png";

const SearchBarHome = (props) => {
  // const [movieResults, setMovieResults] = useState("");
  const { handleChange, handleSubmit } = props;

  return (
    <div className="search-bar-home">
      <input
        type="text"
        className="search-field"
        onChange={handleChange}
        placeholder="What would you like to watch?"
      />
      <button className="search-button" type="submit" onClick={handleSubmit}>
        <img src={searchIcon} alt="magnifying glass" />
      </button>
    </div>
  );
};

export default SearchBarHome;
