import FooterScroll from "./FooterScroll";
import MovieCard from "./MovieCard";

const SearchResults = (props) => {
  const { movieResults } = props;

  return (
    <div className="movie-list">
      <div className="movie-items">
        {/* get and render movie card for each movie */}
        {movieResults.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
