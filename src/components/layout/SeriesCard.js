import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SeriesCard = (props) => {
  const { series } = props;
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
    const newPath = `${basePath}/${series.title || "movie"}`;

    if (newPath !== location.pathname) {
      navigate(`/series-detail/${series.title}`, { state: { id: series.id } });
    }
    // navigate("/detail", { state: { id: series.id } });
  };

  return (
    <div
      className="series-card"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={handleClick}
    >
      <div className="image-wrapper">
        <img
          className="series-img"
          src={`https://image.tmdb.org/t/p/w185${series.poster_path}`}
          alt={series.title}
        />
        <div className={`description ${isVisible ? "visible" : ""}`}>
          <p>{series.overview}</p>
        </div>
        <div className="rating">
          <div className="percent">
            {series.vote_average === 0 ? "NR" : series.vote_average * 10}
          </div>
          <div className="symbol">{series.vote_average === 0 ? "" : "%"}</div>
        </div>
        <div className="content">
          <h3>{series.name}</h3>
          <p>{series.first_air_date}</p>
        </div>
      </div>
    </div>
  );
};

export default SeriesCard;
