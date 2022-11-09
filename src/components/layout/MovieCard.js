const MovieCard = (props) => {
  const { movie } = props;

  return (
    <div className="movie-card">
      <img
        className="movie-img"
        src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
        alt={movie.title}
      />
      <div className="rating">{movie.vote_average * 10}</div>
      <div className="content">
        <h2>{movie.title}</h2>
        <p>{movie.release_date}</p>
      </div>
    </div>
  );
};

export default MovieCard;
