import ProductStyle from "./ProductCard.module.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const hasOffer = true;
const discountRate = 10;
const ProductCard = ({ id, name, description, price, imgurl }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={ProductStyle.cardContainer}
      >
        <div className={ProductStyle.discountRateContainer}>
          <p className={ProductStyle.discountRate}>{discountRate}% Off</p>
        </div>
        <Link to="/single">
          <img
            className={ProductStyle.image}
            src={imgurl}
            alt="product pricture"
          />
        </Link>
        <Link to="/single" style={{ textDecoration: "none" }}>
          <h2 className={ProductStyle.productName}>{name}</h2>
        </Link>
        <p className={ProductStyle.description}>
          {description?.substring(0, 76)}...
        </p>
        <div className={ProductStyle.PricingPart}>
          <div className={ProductStyle.priceContainer}>
            <p className={ProductStyle.originalPrice}>
              {hasOffer && <span className={ProductStyle.offerLine}></span>}$
              {price}
            </p>
            {hasOffer && (
              <p className={ProductStyle.discoutedPrice}>
                ${Number(price) - (Number(price) * discountRate) / 100}
              </p>
            )}
          </div>
          <button className={ProductStyle.addToCartBtn}>+</button>
        </div>
      </motion.div>
    </>
  );
};
export default ProductCard;
