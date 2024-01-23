import style from "./Products.module.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import axios from "axios";
import { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import FilterSection from "../../components/filterSection/filterSection";
import { motion } from "framer-motion";
const Products = () => {
  const [Products, setProducts] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getProducts() {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_ENDPOINT}product/AllProducts`
        );
        if (response) {
          console.log(response.data.data);
          setProducts(response.data.data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getProducts();
  }, []);
  return (
    <>
      <motion.main
        initial={{ x: -window.innerWidth }}
        animate={{ x: 0 }}
        exit={{ x: window.innerWidth }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.35, 1] }}
        className={style.mainContainer}
      >
        <FilterSection />

        <section className={style.cardsContainer}>
          <SearchBar />
          <div className={style.cardsWrapper}>
            {Products &&
              Products.map((product, index) => (
                <ProductCard
                  id={product._id}
                  key={index}
                  name={product.name}
                  description={product.description}
                  price={product.soldQuantityCounter}
                  imgurl={product.image}
                />
              ))}
          </div>
        </section>
      </motion.main>
    </>
  );
};

export default Products;
