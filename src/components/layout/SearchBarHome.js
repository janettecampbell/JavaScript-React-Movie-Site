import searchIcon from "../images/search-icon.png";

const SearchBarHome = (props) => {
  const { handleChange, handleSubmit } = props;

  return (
    <div className="search-bar-home">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-field"
          onChange={handleChange}
          placeholder="What would you like to watch?"
        />
        <button className="search-button" type="submit" onClick={handleSubmit}>
          <img src={searchIcon} alt="magnifying glass" />
        </button>
      </form>
    </div>
  );
};

export default SearchBarHome;
