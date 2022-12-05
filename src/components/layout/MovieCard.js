import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import noPoster from "../images/no-image.jpg";
import backgroundImage from "../images/background-image.jpg";

const MovieCard = (props) => {
  const { movie } = props;
  const navigate = useNavigate();
  const location = useLocation();

  const [isVisible, setIsVisible] = useState(false);

  // show movie overview on mouse over
  const handleMouseOver = () => {
    if (movie.overview === "") {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  // hide movie overview on mouse out
  const handleMouseOut = () => {
    setIsVisible(false);
  };

  // make sure current location doesn't match movie-detail page
  // then navigate to page
  const handleClick = () => {
    const basePath = location.pathname;
    const newPath = `${basePath}/movie-detail/${movie.title || "movie"}`;

    if (newPath !== location.pathname) {
      navigate(`/movie-detail/${movie.title}`, { state: { id: movie.id } });
    }
  };

  // convert results date to US date format
  const convertDate = (inputDate = "") => {
    const [year, month, day] = inputDate.split("-");
    const date = [month, day, year].join("/");
    return date;
  };

  return (
    <div
      className="movie-card"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={handleClick}
    >
      <div className="image-wrapper">
        {movie.poster_path ? (
          <div className="poster-image-wrapper">
            <img
              className="movie-img-background"
              src={backgroundImage}
              alt="Sizer"
            />
            <img
              className="movie-img"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          </div>
        ) : (
          <div className="poster-image-wrapper">
            <img
              className="movie-img-background"
              src={backgroundImage}
              alt="Sizer"
            />
            <img className="movie-img" src={noPoster} alt="No Poster" />
          </div>
        )}
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
        <p>{`${convertDate(
          movie.release_date || movie.first_air_date
        )} (US)`}</p>
      </div>
    </div>
  );
};

export default MovieCard;
