import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../layout/NavBar";
import playButton from "../images/play-button.png";
import noPosterLG from "../images/no-image-500x750.jpg";
import noBackdrop from "../images/no-backdrop.jpg";
import Footer from "../layout/Footer";

const MovieDetail = () => {
  const [details, setDetails] = useState("");
  const [videos, setVideos] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [playVideoIsVisible, setPlayVideoIsVisible] = useState(true);

  const location = useLocation();
  const movieID = location.state.id;

  // get movie data for selected movie
  useEffect(() => {
    const fetchMovieData = async () => {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${movieID}?api_key=4af29920e903cef08f533ae3feff4860&language=en-US`
      ).then((res) => res.json());

      setDetails(data);
    };

    fetchMovieData();
  }, [movieID]);

  // get videos for selected movie
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=4af29920e903cef08f533ae3feff4860&language=en-US`
    )
      .then((res) => res.json())
      .then((json) => setVideos(json.results))
      .catch((err) => console.error(err));
  }, [movieID]);

  // set page title to movie name
  useEffect(() => {
    document.title = `Movie Page | ${details.title || "Details"}`;
  }, [details.title]);

  // close video when you click anywhere off of video
  useEffect(() => {
    const closeVideo = (e) => {
      if (
        e.target.className !== "trailer-wrapper" &&
        e.target.className !== "play-button" &&
        e.target.className !== "play-button-style play-button"
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener("click", closeVideo);

    return () => document.removeEventListener("click", closeVideo);
  }, []);

  // if there are no videos don't show play trailer button
  useEffect(() => {
    if (videos.length === 0) {
      setPlayVideoIsVisible(false);
    } else {
      setPlayVideoIsVisible(true);
    }
  }, [videos]);

  // convert result date to US date format
  const convertDate = (inputDate = "") => {
    const [year, month, day] = inputDate.split("-");
    const date = [month, day, year].join("/");
    return date;
  };

  // get genres and separate with commas
  const getGenre = (inputArray = []) => {
    let genres = [];

    for (let i = 0; i < inputArray.length; i++) {
      genres.push(inputArray[i].name);
    }

    return genres.join(", ");
  };

  // get movie hour length
  const getHours = (inputMinutes) => {
    const hours = Math.floor(inputMinutes / 60);

    return hours;
  };

  // get remaining minute length
  const getMinutes = (inputMinutes) => {
    const minutes = inputMinutes % 60;

    return minutes;
  };

  // if there is a video get the Trailer of Official videos first
  // if they don't exist play first video
  const getVideo = () => {
    const baseURL = "https://www.youtube-nocookie.com/embed/";

    for (let i = 0; i < videos.length; i++) {
      if(videos[i].type === "Trailer"){
        if (videos[i].name.includes("Official")) {
          return baseURL + videos[i].key;
        } else if (videos[i].name.includes("Trailer")) {
          return baseURL + videos[i].key;
        }
      }
    }
    return baseURL + videos[0];
  };

  // format results to include commas
  const convertToDollars = (inputNumber = "Unknown") => {
    return inputNumber.toLocaleString("en-US", { currency: "USD" });
  };

  // get image for movie
  const getPoster = () => {
    if (details.poster_path !== null) {
      return `https://image.tmdb.org/t/p/w500${details.poster_path}`;
    } else return noPosterLG;
  };

  // get movie backdrop image for background
  const getBackdrop = () => {
    if (details.backdrop_path !== null) {
      return `https://image.tmdb.org/t/p/original${details.backdrop_path}`;
    } else return noBackdrop;
  };

  // movie trailer only visible on click
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
            src={details.backdrop_path ? getBackdrop() : noBackdrop}
            alt={`${details.title} Backdrop`}
          />
        </div>
        <div className="detail-panel">
          <div className="poster-wrapper">
            <img
              className="poster"
              src={details.poster_path ? getPoster() : noPosterLG}
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
              <div
                className={`trailer-wrapper${
                  playVideoIsVisible ? " play-video-visible" : ""
                }`}
                onClick={handleClick}
              >
                <img
                  className="play-button-style play-button"
                  src={playButton}
                  alt="play button"
                />
                <h3 className="play-button">Play Trailer</h3>
              </div>
            </div>
            <div className="website-wrapper">
              <h4>
                <a href={details.homepage}>Official Movie Website</a>
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
      <Footer />
    </div>
  );
};

export default MovieDetail;
