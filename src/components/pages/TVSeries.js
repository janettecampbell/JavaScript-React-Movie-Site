import { useEffect } from "react";
import { useState } from "react";
import { json } from "react-router-dom";
import NavBar from "../layout/NavBar";

const TVSeries = () => {
  const [popularSeries, setPopularSeries] = useState(null);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/tv/popular?api_key=4af29920e903cef08f533ae3feff4860&language=en-US&page=1"
    )
      .then((res) => json())
      .then((json) => setPopularSeries(json.results));
  }, []);

  return (
    <div className="tv-home">
      <NavBar />
      <div className="column-left">Search Params</div>
      <div className="movie-list">
        {popularSeries && }
      </div>
    </div>
  );
};

export default TVSeries;
