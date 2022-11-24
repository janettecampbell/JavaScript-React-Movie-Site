import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../layout/NavBar";

const MovieDetail = () => {
  const [details, setDetails] = useState("");
  const [videos, setVideos] = useState("");

  const location = useLocation();
  // const movieID = location.state.id;
  const movieID = 436270;

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieID}?api_key=4af29920e903cef08f533ae3feff4860&language=en-US`
    )
      .then((res) => res.json())
      .then((json) => setDetails(json))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=4af29920e903cef08f533ae3feff4860&language=en-US`
    )
      .then((res) => res.json())
      .then((json) => setVideos(json.results[0]))
      .catch((err) => console.error(err));
  }, []);

  console.log(videos);

  useEffect(() => {
    document.title = `Movie Page | ${details.title || "Details"}`;
  }, [details.title]);

  const convertDate = (inputDate = "") => {
    const [year, month, day] = inputDate.split("-");
    const date = [month, day, year].join("/");
    return date;
  };

  const getGenre = (inputArray = []) => {
    let genres = [];

    for (let i = 0; i < inputArray.length; i++) {
      genres.push(inputArray[i].name);
    }

    return genres.join(", ");
  };

  const getHours = (inputMinutes) => {
    const hours = Math.floor(inputMinutes / 60);

    return hours;
  };

  const getMinutes = (inputMinutes) => {
    const minutes = inputMinutes % 60;

    return minutes;
  };

  const convertToDollars = (inputNumber = "Unknown") => {
    return inputNumber.toLocaleString("en-US", { currency: "USD" });
  };

  return (
    <div className="detail-page">
      <NavBar />
      <div className="detail-box">
        <div className="background-image-wrapper">
          <img
            className="background-image"
            src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`}
            alt={details.title}
          />
        </div>
        <div className="detail-panel">
          <div className="poster-wrapper">
            <img
              className="poster"
              src={`https://image.tmdb.org/t/p/w342${details.poster_path}`}
              alt={`${details.title} Poster`}
            />
          </div>
          <div className="content-wrapper">
            <div className="title-wrapper">
              <h1>{details.title}</h1>
              <p>
                <span>{convertDate(details.release_date)} (US)</span> &#8226;{" "}
                <span>{getGenre(details.genres)} &#8226;</span>{" "}
                <span>
                  {getHours(details.runtime)}h {getMinutes(details.runtime)}m
                </span>
              </p>
            </div>
            <div className="score-wrapper">
              <div className="score-text">
                <div className="movie-rating">
                  <h1>
                    {details.vote_average > 0
                      ? parseInt(
                          Math.round(details.vote_average * 10).toFixed(0)
                        )
                      : "NR"}
                  </h1>
                </div>
                <div className="movie-symbol">
                  <p>{details.vote_average > 0 ? "%" : ""}</p>
                </div>
              </div>
            </div>
            <div className="website-wrapper">
              <h4>
                <a href={details.homepage}>Official Movie Website</a>
              </h4>
            </div>
            <div className="tagline-wrapper">
              <i>{details.tagline}</i>
            </div>
            <div className="overview-wrapper">
              <h3>Overview</h3>
              {details.overview}
            </div>
            <div className="bottom-section">
              <div className="status-wrapper">
                <h3>Status</h3>
                <p>{details.status}</p>
              </div>
              <div className="budget-wrapper">
                <h3>Budget</h3>
                <p>${convertToDollars(details.budget)}</p>
              </div>
              <div className="revenue-wrapper">
                <h3>Revenue</h3>
                <p>${convertToDollars(details.revenue)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="movie-trailer">
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videos.key}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div> */}
    </div>
  );
};

export default MovieDetail;
