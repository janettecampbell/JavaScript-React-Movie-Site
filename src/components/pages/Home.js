import SearchBar from "../layout/SearchBar";
import NavBar from "../layout/NavBar";
import Backdrop from "../Backdrop";
import { useEffect, useState } from "react";

const Home = (props) => {
  const [backdrops, setBackdrops] = useState(null);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=4af29920e903cef08f533ae3feff4860&language=en-US&page=1"
    )
      .then((res) => res.json())
      .then((json) => setBackdrops(json.results));
  }, []);
  return (
    <div className="home-page">
      <h1>Home Page</h1>
      {backdrops && <Backdrop backdrops={backdrops} />}
      <NavBar />
      <SearchBar />
    </div>
  );
};

export default Home;
