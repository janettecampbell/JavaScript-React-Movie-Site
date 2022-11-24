import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const MovieCard = (props) => {
  const { movie } = props;
  const navigate = useNavigate();
  const location = useLocation();

  const [isVisible, setIsVisible] = useState(false);

  const handleMouseOver = () => {
    setIsVisible(true);
  };

  const handleMouseOut = () => {
    setIsVisible(false);
  };

  const handleClick = () => {
    const basePath = location.pathname;
    const newPath = `${basePath}/${movie.title || "movie"}`;

    if (newPath !== location.pathname) {
      navigate(`/detail/${movie.title}`, { state: { id: movie.id } });
    }
    // navigate("/detail", { state: { id: movie.id } });
  };

  return (
    <div
      className="movie-card"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={handleClick}
    >
      <div className="image-wrapper">
        <img
          className="movie-img"
          src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
          alt={movie.title}
        />
        <div className={`description ${isVisible ? "visible" : ""}`}>
          <p>{movie.overview}</p>
        </div>
      </div>
      <div className="rating">
        <div className="percent">
          {movie.vote_average === 0 ? "NR" : movie.vote_average * 10}
        </div>
        <div className="symbol">{movie.vote_average === 0 ? "" : "%"}</div>
      </div>
      <div className="content">
        <h3>{movie.title || movie.name}</h3>
        <p>{movie.release_date || movie.first_air_date}</p>
      </div>
    </div>
  );
};

export default MovieCard;