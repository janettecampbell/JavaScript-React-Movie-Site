import MovieCard from "./MovieCard";

const SearchResults = (props) => {
  const { movieResults } = props;

  return (
    <div className="movie-list">
      <div className="movie-items">
        {movieResults.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;