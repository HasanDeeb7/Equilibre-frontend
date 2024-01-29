import style from "./Products.module.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import axios from "axios";
import { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import FilterSection from "../../components/filterSection/filterSection";
import { Helmet } from 'react-helmet-async';
const Products = () => {
  const [Products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getProducts() {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_ENDPOINT}product/AllProducts`
        );
        if (response) {
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
      <Helmet>
        <title>Equilibre - products</title>
        <meta name="decription" content="" />
      </Helmet>
      <h1 className={style.pageTitle}>All Products</h1>
      <main className={style.mainContainer}>
        <FilterSection
          setProductLoading={setLoading}
          setProducts={setProducts}
        />
        <section className={style.cardsContainer}>
          <SearchBar setProductLoading={setLoading} setProducts={setProducts} />
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className={style.cardsWrapper}>
              {Products.length === 0 ? (
                <p>No products available for this filter.</p>
              ) : (
                Products &&
                Products.map((product, index) => (
                  <ProductCard
                    id={product._id}
                    key={index}
                    name={product.name}
                    description={product.description}
                    size={product.sizes}
                    imgurl={product.image}
                    offerId={product.offerId}
                    slug={product.slug}
                  />
                ))
              )}
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default Products;
