import SearchIcon from "../../assets/search.svg";
import SearchStyle from "./SearchBard.module.css";
import { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
const SearchBar = ({setProducts,setProductLoading,setTitle}) => {
  const [search, setSearch] = useState("");
  const location = useLocation();
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
        const newUrl = `${location.pathname}?name=${search}`
        window.history.replaceState(null, '', `${newUrl}`);
        setTitle(`Search Results for  ${search}`)
        setProductLoading(false);
      }
    } catch (error) {
      setProductLoading(false)
      console.log(error);
    }
  }
  
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const nameParam = urlSearchParams.get("name");
  
    if (nameParam) {
      // Handle the case where the query parameter exists on page load
      // For example, remove the query parameter from the URL
      const cleanUrl = location.pathname;
      window.history.replaceState(null, "", cleanUrl);
  
      // Perform any other actions you need when the query parameter is removed
    }
  }, [location]);


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
