const Backdrop = (props) => {
  const { backdrops } = props;

  let backdropPath;
  let backdropTitle;

  const getBackdrop = () => {
    for (let i = 0; i < backdrops.length; i++) {
      if (backdrops[i].adult) {
        continue;
      } else {
        backdropPath = backdrops[i].backdrop_path;
        break;
      }
    }
  };

  const getTitle = () => {
    for (let i = 0; i < backdrops.length; i++) {
      if (backdrops[i].adult) {
        continue;
      } else {
        backdropTitle = backdrops[i].title;
      }
    }
  };

  getBackdrop();
  getTitle();

  return (
    <div className="backdrop">
      {/* {backdrops.map((movie) => (
        <Backdrop key={movie.id} movie={movie} />
      ))} */}
      <img
        style={{ opacity: 0.25 }}
        className="backdrop-image"
        src={`https://image.tmdb.org/t/p/w500${backdropPath}`}
        alt={backdropTitle}
      />
    </div>
  );
};

export default Backdrop;
