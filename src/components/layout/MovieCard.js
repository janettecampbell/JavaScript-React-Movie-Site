const MovieCard = (props) => {
  const { movie } = props;

  return (
    <div className="movie-card">
      <img
        className="movie-img"
        src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
        alt={movie.title}
      />
      <div className="rating">
        <div className="percent">{movie.vote_average * 10}</div>
        <div className="symbol">%</div>
      </div>
      <div className="content">
        <h3>{movie.title || movie.name}</h3>
        <p>{movie.release_date || movie.first_air_date}</p>
      </div>
    </div>
  );
};

export default MovieCard;
