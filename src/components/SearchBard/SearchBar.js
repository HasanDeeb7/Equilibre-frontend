import SearchIcon from "../../assets/search.svg";
import SearchStyle from "./SearchBard.module.css";
import { useState } from "react";
const SearchBar = () => {
  const [product, setProduct] = useState([""]);

  const handleInputChange = (e) => {
    setProduct(e.target.value);
  };

  const handleSearch = () => {
    console.log("Searching for:", product);
  };

  return (
    <>
      <div className={SearchStyle.inputContainer}>
        <input
          type="text"
          name="product"
          id="product"
          placeholder="Search..."
          className={SearchStyle.inputSearch}
          onChange={handleInputChange}
          value={product}
        ></input>
        <button
        onClick={handleSearch}
          className={SearchStyle.searchBtn}
        >
          <img
            src={SearchIcon}
            alt="search icon"
            className={SearchStyle.searchIcon}
          ></img>
        </button>
      </div>
    </>
  );
};
export default SearchBar;
