import Movie from "./MovieCard";

const MovieList = (props) => {
  const { popularMovies } = props;

  return (
    <div className="movie-items">
      {popularMovies.map((movie) => (
        <Movie key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
