import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../layout/NavBar";
import playButton from "../images/play-button.png";

const MovieDetail = () => {
  const [details, setDetails] = useState("");
  const [videos, setVideos] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const location = useLocation();
  // const seriesID = location.state.id;
  const seriesID = 90669;

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/${seriesID}?api_key=4af29920e903cef08f533ae3feff4860&language=en-US`
    )
      .then((res) => res.json())
      .then((json) => setDetails(json))
      .catch((err) => console.error(err));
  }, []);

  console.log(details);

  useEffect(() => {
    const fetchVideoData = async () => {
      const data = await fetch(
        `https://api.themoviedb.org/3/tv/${seriesID}/videos?api_key=4af29920e903cef08f533ae3feff4860&language=en-US`
      ).then((res) => res.json());
      setVideos(data.results);
    };

    fetchVideoData();
  }, []);

  useEffect(() => {
    document.title = `Movie Page | ${details.original_name || "Details"}`;
  }, [details.original_name]);

  useEffect(() => {
    const closeVideo = (e) => {
      if (
        e.path[0].className !== "play-button" &&
        e.path[1].className !== "trailer-wrapper"
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener("click", closeVideo);

    return () => document.removeEventListener("click", closeVideo);
  }, []);

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

    return hours < 1 ? "" : hours + "h";
  };

  const getMinutes = (inputMinutes) => {
    const minutes = inputMinutes % 60;

    return minutes < 1 ? "" : minutes + "m";
  };

  const getVideo = () => {
    const baseURL = "https://www.youtube.com/embed/";

    for (let i = 0; i < videos.length; i++) {
      if (videos[i].name.includes("Trailer")) {
        return baseURL + videos[i].key;
      } else if (videos[i].name.includes("Official")) {
        return baseURL + videos[i].key;
      }
    }
    return baseURL + videos[0];
  };

  const convertToDollars = (inputNumber = "Unknown") => {
    return inputNumber.toLocaleString("en-US", { currency: "USD" });
  };

  const handleClick = () => {
    setIsVisible((current) => !current);
  };

  return (
    <div className="detail-page">
      <NavBar />
      <div className="detail-box">
        <div className="background-image-wrapper">
          <img
            className="background-image"
            src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`}
            alt={`${details.original_name} Backdrop`}
          />
        </div>
        <div className="detail-panel">
          <div className="poster-wrapper">
            <img
              className="poster"
              src={`https://image.tmdb.org/t/p/w342${details.poster_path}`}
              alt={`${details.original_name} Poster`}
            />
          </div>
          <div className="content-wrapper">
            <div className="title-wrapper">
              <h1>{details.original_name}</h1>

              <p>
                <span>{convertDate(details.first_air_date)} (US)</span> &#8226;{" "}
                <span>{getGenre(details.genres)} &#8226;</span>{" "}
                <span>
                  {getHours(details.episode_run_time)}{" "}
                  {getMinutes(details.episode_run_time)}
                </span>
              </p>
            </div>
            <div className="score-bar">
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
              <div className="trailer-wrapper" onClick={handleClick}>
                <img
                  className="play-button"
                  src={playButton}
                  alt="play button"
                />
                <h3>Play Trailer</h3>
              </div>
            </div>
            <div className="website-wrapper">
              <h4>
                <a href={details.homepage}>Official Series Website</a>
              </h4>
            </div>
            <div className="tagline-wrapper">
              <p>
                <i>{details.tagline}</i>
              </p>
            </div>
            <div className="overview-wrapper">
              <h3>Overview</h3>
              <p>{details.overview}</p>
            </div>
            <div className="bottom-section">
              <div className="type-wrapper">
                <h3>Type</h3>
                <p>{details.type}</p>
              </div>
              <div className="last-episode-wrapper">
                <h3>Last Episode Air Date</h3>
                <p>{convertDate(details.last_air_date)}</p>
              </div>
              <div className="next-episode-wrapper">
                <h3>Nest Episode Air Date</h3>
                <p>
                  {details.next_episode_to_air === null
                    ? ""
                    : convertDate(details.revenue)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`movie-trailer${isVisible ? " visible-movie" : ""}`}>
        <iframe
          width="560"
          height="315"
          src={getVideo()}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default MovieDetail;
