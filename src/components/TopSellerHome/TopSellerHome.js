import style from "./TopSellerHome.module.css";
import HomeProductCard from "../HomeProductCard/HomeProductCard";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
const TopSellerHome = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getProducts() {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_ENDPOINT}statistics/top-seller-product`
        );
        if (response) {
          setProduct(response.data.topSellerProducts);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getProducts(product);
  }, []);

  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className={style.sectionTopProducts}
      >
        <h2 className={style.sectionTitle}>Most Popular Products</h2>
        <p className={style.sectionSubTitle}>
          Our top selling product that you may like
        </p>
        <div className={style.cardWrapper}>
          {product &&
            product.map((product, index) => (
              <HomeProductCard
                key={index}
                name={product.name}
                image={product.image}
                slug={product.slug}
              />
            ))}
        </div>
      </motion.section>
    </>
  );
};
export default TopSellerHome;
