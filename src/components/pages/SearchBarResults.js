import NavBar from "../layout/NavBar";
import SearchResults from "../layout/SearchResults";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const SearchBarResults = (props) => {
  const [movieResults, setMovieResults] = useState([]);
  const location = useLocation();
  const searchInput = location.state.searchInput;

  console.log(searchInput);

  useEffect(() => {
    const fetchSearchData = async () => {
      const data = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=4af29920e903cef08f533ae3feff4860&language=en-US&query=${searchInput}&page=1&include_adult=false`
      ).then((res) => res.json());

      setMovieResults(data.results);
    };

    fetchSearchData();
    // fetch(
    //   `https://api.themoviedb.org/3/search/movie?api_key=4af29920e903cef08f533ae3feff4860&language=en-US&query=${searchInput}&page=1&include_adult=false`
    // )
    //   .then((res) => res.json())
    //   .then((json) => {
    //     setMovieResults(json.results);
    //     console.log(json);
    //   })
    //   .catch((err) => console.error(err));
  }, [searchInput]);

  console.log(movieResults);

  return (
    <div className="search-bar-results">
      <NavBar />
      <SearchResults movieResults={movieResults} />
    </div>
  );
};

export default SearchBarResults;
