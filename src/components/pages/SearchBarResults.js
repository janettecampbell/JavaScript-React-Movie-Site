import NavBar from "../layout/NavBar";
import SearchResults from "../layout/SearchResults";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const SearchBarResults = (props) => {
  const [movieResults, setMovieResults] = useState([]);
  const [page, setPage] = useState(2);
  const [totalPages, setTotalPages] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const location = useLocation();
  const searchInput = location.state.searchInput;

  console.log(searchInput);

  useEffect(() => {
    setPage(2);

    const fetchSearchData = async () => {
      const data = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=4af29920e903cef08f533ae3feff4860&language=en-US&query=${searchInput}&page=1&include_adult=false`
      ).then((res) => res.json());

      setMovieResults(data.results);
      setTotalPages(data.total_pages);
    };

    fetchSearchData();
  }, [searchInput]);

  console.log(totalPages);

  const handleClick = () => {
    setPage(page + 1);

    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=4af29920e903cef08f533ae3feff4860&language=en-US&query=${searchInput}&page=${page}&include_adult=false`
    )
      .then((res) => res.json())
      .then((json) => setMovieResults([...movieResults, ...json.results]));

    if (totalPages < page) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  console.log(page);

  return (
    <div className="search-bar-results">
      <NavBar />
      <SearchResults movieResults={movieResults} />
      <div className="load-more">
        <button
          className={`btn-load${isVisible ? " btn-visible" : ""}`}
          onClick={handleClick}
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default SearchBarResults;
