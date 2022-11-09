import MovieResults from "./MovieResults";

const SearchResults = (props) => {
  const { handleSubmit, handleChange, movies, setMovies, searchInput } = props;

  return (
    <div className="return-results">
      <div className="search-term">{}searchInput</div>
      {/* {movies.map((movie) => (
        <MovieResults key={results.id} />
      ))} */}
    </div>
  );
};

export default SearchResults;
