import SearchIcon from "../../assets/search.svg";
import SearchStyle from "./SearchBard.module.css";
import { useState } from "react";
import axios from "axios";
const SearchBar = ({setProducts,setProductLoading}) => {
  const [search, setSearch] = useState([""]);

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = async () => {
    try {
      setProductLoading(true);
      setSearch("")
      const response = await axios.post(
        `${process.env.REACT_APP_ENDPOINT}product/search`,
        {name:search}
      );
      if (response) {
        setProducts(response.data);
        setProductLoading(false);
      }
    } catch (error) {
      setProductLoading(false)
      console.log(error);
    }
  }
  

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
          value={search}
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
