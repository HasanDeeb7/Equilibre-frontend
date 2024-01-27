import ProductStyle from "./ProductCard.module.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const ProductCard = ({ offerId, name, description, size, imgurl, slug }) => {
  return (
    <>
      <Link to={`/single/${slug}`} style={{ textDecoration: "none" }}>
        <article className={ProductStyle.cardContainer}>
          {offerId && (
            <div className={ProductStyle.discountRateContainer}>
              <p className={ProductStyle.discountRate}>
                {offerId.discountRate}% Off
              </p>
            </div>
          )}

          <section>
            <figure>
              <img
                className={ProductStyle.image}
                src={imgurl}
                alt="product pricture"
              />
              <figcaption>
                <h2 className={ProductStyle.productName}>
                  {name}{" "}
                  <span>
                    ({size[0].capacity} {size[0].unit})
                  </span>{" "}
                </h2>
                <p className={ProductStyle.description}>
                  {description?.substring(0, 50)}...
                </p>
              </figcaption>
            </figure>
          </section>
          <section className={ProductStyle.PricingPart}>
            <div className={ProductStyle.priceContainer}>
              <p className={ProductStyle.originalPrice}>
                {offerId && <span className={ProductStyle.offerLine}></span>}$
                {size[0].price}
              </p>
              {offerId && (
                <p className={ProductStyle.discoutedPrice}>
                  $
                  {Number(size[0].price) -
                    (Number(size[0].price) * offerId.discountRate) / 100}
                </p>
              )}
            </div>
          </section>
        </article>
      </Link>
    </>
  );
};
export default ProductCard;
