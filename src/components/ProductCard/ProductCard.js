import ProductStyle from "./ProductCard.module.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const ProductCard = ({ offerId, name, description, size, imgurl, slug }) => {
  let existingOffer = null;
  if (offerId) {
    const currentDateISO = new Date().toISOString();
    if (
      offerId &&
      offerId.startDate <= currentDateISO &&
      offerId.endDate >= currentDateISO
    ) {
      existingOffer = offerId;
    }
  }
  console.log(name, existingOffer);
  return (
    <>
      <Link to={`/single/${slug}`} style={{ textDecoration: "none" }}>
        <article className={ProductStyle.cardContainer}>
          {existingOffer && (
            <div className={ProductStyle.discountRateContainer}>
              <p className={ProductStyle.discountRate}>
                {existingOffer.discountRate}% Off
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
              <p
                className={`${ProductStyle.originalPrice} ${
                  existingOffer && ProductStyle.originalPriceDiscount
                }`}
              >
                {existingOffer && (
                  <span className={ProductStyle.offerLine}></span>
                )}
                ${size[0].price}
              </p>
              {existingOffer && (
                <p className={ProductStyle.discoutedPrice}>
                  $
                  {Number(size[0].price) -
                    (Number(size[0].price) * existingOffer.discountRate) / 100}
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
