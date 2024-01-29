import axios from "axios";
import style from "./RelatedProduct.module.css";
import { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";

function RelatedProduct({ product }) {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  async function getByCategory() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ENDPOINT}product/byCategory`,
        { params: { categoryId: product.categoryId } }
      );
      if (response) {
        setRelatedProducts(response.data.slice(0, 4));
        console.log(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getByCategory();
  }, []);
  return (
    <section className={style.secondSectionContainer}>
      <section className={style.nutritionalInfoContainer}>
        <h3>Nutrition benefits of {product.name}</h3>
        <section className={style.nutritionalInfo}>
          {product.nutritionalInfo ||
            "Oak honey, sourced from bees that collect nectar from oak trees, provides antioxidants, vitamins (like C and minerals), and potential anti-inflammatory benefits. As a natural sweetener with historical use in wound healing, it can be a healthier alternative to refined sugars. While it may contain trace amounts of local pollen, offering potential relief for seasonal allergies, moderation is key, especially for individuals with specific health conditions. The exact nutritional content varies based on floral sources and region."}
        </section>
      </section>
      {!loading && (
        <section className={style.relatedProductsContainer}>
          {relatedProducts.map((item) => (
            <ProductCard
              price={item.sizes[0]?.price}
              name={item.name}
              description={item.description}
              size={product.sizes}
              imgurl={product.image}
              slug={product.slug}
            />
          )) || <p>No Related Products</p>}
        </section>
      )}
    </section>
  );
}

export default RelatedProduct;
