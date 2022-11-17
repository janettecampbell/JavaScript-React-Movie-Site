import { useEffect } from "react";
import { useState } from "react";
import NavBar from "../layout/NavBar";
import SeriesList from "../layout/SeriesList";

const TVSeries = () => {
  const [popularSeries, setPopularSeries, page, setPage] = useState(null);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/tv/popular?api_key=4af29920e903cef08f533ae3feff4860&language=en-US&page=1"
    )
      .then((res) => res.json())
      .then((json) => setPopularSeries(json.results));
  }, []);

  return (
    <div className="series-home">
      <NavBar />
      <div className="column-left">Search Params</div>
      <div className="series-list">
        {popularSeries && <SeriesList popularSeries={popularSeries} />}
      </div>
    </div>
  );
};

export default TVSeries;
