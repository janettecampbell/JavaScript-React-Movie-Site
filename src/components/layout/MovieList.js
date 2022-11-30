import Movie from "./MovieCard";

const MovieList = (props) => {
  const { movies } = props;

  return (
    <div className="movie-items">
      {movies.map((movie) => (
        <Movie key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
