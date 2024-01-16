import ProductStyle from "./ProductCard.module.css";
import pic from "../../assets/WhatsApp_Image_2024-01-11_at_10.34.18_PM-removebg-preview.png";
const hasOffer = true;
const discountRate = 10;
const ProductCard = ({ name, description, price }) => {
  return (
    <>
      <div className={ProductStyle.cardContainer}>
        <div className={ProductStyle.discountRateContainer}>
          <p className={ProductStyle.discountRate}>{discountRate}% Off</p>
        </div>
        <img className={ProductStyle.image} src={pic} alt="product pricture" />
        <h2 className={ProductStyle.productName}>{name}</h2>
        <p className={ProductStyle.description}>{description.substring(0, 76)}...</p>
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
      </div>
    </>
  );
};
export default ProductCard;
