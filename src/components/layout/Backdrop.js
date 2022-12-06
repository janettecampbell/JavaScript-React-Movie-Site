const Backdrop = (props) => {
  const { movies } = props;

  let backdropPath;
  let backdropTitle;

  // get popular movie for background
  // exclude adult and horror films
  const getBackdrop = () => {
    for (let i = 0; i < movies.length; i++) {
      if (movies[i].adult) {
        continue;
      } else {
        const genre = movies[i].genre_ids;
        for (let j = 0; j < genre.length; j++) {
          if (genre[j] === 27) {
            i++;
            break;
          }
        }
        backdropPath = movies[i].backdrop_path;
        break;
      }
    }
  };

  // get title of the popular movie chosen for background
  const getTitle = () => {
    for (let i = 0; i < movies.length; i++) {
      if (movies[i].adult) {
        continue;
      } else {
        const genre = movies[i].genre_ids;
        for (let j = 0; j < genre.length; j++) {
          if (genre[j] === 27) {
            i++;
            break;
          }
        }
        backdropTitle = movies[i].title;
        break;
      }
    }
  };

  getBackdrop();
  getTitle();

  return (
    <div className="backdrop">
      <img
        className="backdrop-image"
        src={`https://image.tmdb.org/t/p/original${backdropPath}`}
        alt={backdropTitle}
      />
    </div>
  );
};

export default Backdrop;
