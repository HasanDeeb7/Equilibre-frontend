import style from "./RelatedProduct.module.css";

function RelatedProduct({ product }) {
  return (
    <section className={style.secondSectionContainer}>
      <section className={style.nutritionalInfoContainer}>
        <h3>Nutrition benefits of {product.name}</h3>
        <section className={style.nutritionalInfo}>
          {product.nutritionalInfo ||
            'Oak honey, sourced from bees that collect nectar from oak trees, provides antioxidants, vitamins (like C and minerals), and potential anti-inflammatory benefits. As a natural sweetener with historical use in wound healing, it can be a healthier alternative to refined sugars. While it may contain trace amounts of local pollen, offering potential relief for seasonal allergies, moderation is key, especially for individuals with specific health conditions. The exact nutritional content varies based on floral sources and region.'}
        </section>
      </section>
      <section className={style.relatedProductsContainer}>

      </section>
    </section>
  );
}

export default RelatedProduct;
