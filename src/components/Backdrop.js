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
        break;
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
        className="backdrop-image"
        src={`https://image.tmdb.org/t/p/original${backdropPath}`}
        alt={backdropTitle}
      />
    </div>
  );
};

export default Backdrop;
