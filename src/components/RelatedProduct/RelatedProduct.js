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
      <h2>More Details</h2>
      <section className={style.nutritionalInfoContainer}>
        <h3>Nutrition benefits of {product.name}</h3>
        <section className={style.nutritionalInfo}>
          {product.nutritionalInfo}
        </section>
      </section>
      {!loading && (
        <section className={style.relatedProductsContainer}>
          <h3>Related Products</h3>
          <section className={style.relatedProducts}>
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
        </section>
      )}
    </section>
  );
}

export default RelatedProduct;
