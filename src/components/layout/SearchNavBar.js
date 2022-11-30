import searchIcon from "../images/search-icon.png";

const SearchBarHome = (props) => {
  const { handleChange, handleSubmit } = props;

  return (
    <div className="search-nav-bar">
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          className="search-bar-input"
          onChange={handleChange}
          placeholder="Search..."
        />
        <button
          className="search-bar-button"
          type="submit"
          onClick={handleSubmit}
        >
          <img src={searchIcon} alt="magnifying glass" />
        </button>
      </form>
    </div>
  );
};

export default SearchBarHome;
