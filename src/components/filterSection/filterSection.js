import { useState, useEffect } from "react";
import Styles from "./filterSection.module.css";
import axios from "axios";

const FilterSection = ({ setProducts, setProductLoading }) => {
  const [loading, setLoading] = useState(false);
  const [defaultCategories, setDefaultCategories] = useState([]);
  const [prices, setPrices] = useState([]);
  const [categories, setCategories] = useState([]);

  const handleCategoryChange = (categoryId) => {
    const isSelected = categories.includes(categoryId);
    setCategories((prevCategories) =>
      isSelected
        ? prevCategories.filter((id) => id !== categoryId)
        : [...prevCategories, categoryId]
    );
  };

  const handlePriceChange = (min, max) => {
    const priceRangeIndex = prices.findIndex(
      (range) => range.minPrice === min && range.maxPrice === max
    );

    if (priceRangeIndex !== -1) {
      const updatedPriceRanges = [...prices];
      updatedPriceRanges.splice(priceRangeIndex, 1);
      setPrices(updatedPriceRanges);
    } else {
      setPrices((prevPriceRanges) => [
        ...prevPriceRanges,
        { minPrice: min, maxPrice: max },
      ]);
    }
  };

  const handlefilter = async () => {
    try {
      setProductLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_ENDPOINT}product/filter`,
        { categories: categories, prices: prices }
      );
      if (response) {
        setProducts(response.data);
        setProductLoading(false);
      }
    } catch (error) {
      setProductLoading(false);
      console.log(error);
    }
  };

  const handleReset = async () => {
    try {
      setProductLoading(true)
      setCategories([]);
      setPrices([]);
      const response = await axios.get(
        `${process.env.REACT_APP_ENDPOINT}product/AllProducts`
      );
      if (response) {
        setProducts(response.data.data);
        setProductLoading(false)
      }
    } catch (error) {
      setProductLoading(false)
      console.log(error);
    }
  };

  useEffect(() => {
    async function getProducts() {
      try {
        setLoading(true);
        setCategories([]);
        setPrices([]);
        const response = await axios.get(
          `${process.env.REACT_APP_ENDPOINT}category`
        );
        if (response) {
          setDefaultCategories(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getProducts();
  }, []);

  return (
    <section className={Styles.FilterSection}>
      <fieldset>  
          <legend className={Styles.titleCategory}>Categories</legend>

        {loading ? (
          <p>Loading...</p>
        ) : defaultCategories ? (
          defaultCategories.map((category) => (
            <article className={Styles.categorie} key={category.id}>
              <section className={Styles.category}>
                <input
                  type="checkbox"
                  id={category._id}
                  className={Styles.checkbox}
                  onChange={() => handleCategoryChange(category._id)}
                  checked={categories.includes(category._id)}
                />
                <label htmlFor={`category-${category.id}`}>
                  {category.name}
                </label>
              </section>
              <p>{category.products.length}</p>
            </article>
          ))
        ) : (
          <p>No categories found.</p>
        )}
      </fieldset>

      {!loading &&(<><fieldset>
        <legend className={Styles.titlePrice}>Price Ranges</legend>
        <article className={Styles.categorie}>
          <div className={Styles.prices}>
            <div className={Styles.innerprice}>
              <input
                type="checkbox"
                id="priceRange0-10"
                className={Styles.checkbox}
                onChange={() => handlePriceChange(0, 10)}
                checked={
                  prices.find(
                    (range) => range.minPrice === 0 && range.maxPrice === 10
                  ) !== undefined
                }
              />
              <label htmlFor="priceRange0-10">0$ - 10$</label>
            </div>
            <div className={Styles.innerprice}>
              <input
                type="checkbox"
                id="priceRange10-20"
                className={Styles.checkbox}
                onChange={() => handlePriceChange(10, 20)}
                checked={
                  prices.find(
                    (range) => range.minPrice === 10 && range.maxPrice === 20
                  ) !== undefined
                }
              />
              <label htmlFor="priceRange10-20">10$ - 20$</label>
            </div>
            <div className={Styles.innerprice}>
              <input
                type="checkbox"
                id="priceRange20-30"
                className={Styles.checkbox}
                onChange={() => handlePriceChange(20, 30)}
                checked={
                  prices.find(
                    (range) => range.minPrice === 20 && range.maxPrice === 30
                  ) !== undefined
                }
              />
              <label htmlFor="priceRange20-30">20$ - 30$</label>
            </div>
            <div className={Styles.innerprice}>
              <input
                type="checkbox"
                id="priceRange30-40"
                className={Styles.checkbox}
                onChange={() => handlePriceChange(30, 40)}
                checked={
                  prices.find(
                    (range) => range.minPrice === 30 && range.maxPrice === 40
                  ) !== undefined
                }
              />
              <label htmlFor="priceRange30-40">30$ - 40$</label>
            </div>
            <div className={Styles.innerprice}>
              <input
                type="checkbox"
                id="priceRange40-50"
                className={Styles.checkbox}
                onChange={() => handlePriceChange(40, 50)}
                checked={
                  prices.find(
                    (range) => range.minPrice === 40 && range.maxPrice === 50
                  ) !== undefined
                }
              />
              <label htmlFor="priceRange40-50">40$ - 50$</label>
            </div>
          </div>
        </article>
      </fieldset>
            <button onClick={handlefilter} className={Styles.filterBtn}>filter</button>
            <button onClick={handleReset} className={Styles.resetBtn}>reset</button>
            </>
      ) }

    </section>
  );
};

export default FilterSection;
