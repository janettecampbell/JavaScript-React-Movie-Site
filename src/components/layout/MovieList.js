import Movie from "./MovieCard";

const MovieList = (props) => {
  const { popularMovies } = props;

  return (
    <div className="movie-list">
      {popularMovies.map((movie) => (
        <Movie key={popularMovies.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
