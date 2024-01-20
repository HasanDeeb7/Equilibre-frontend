import React, { useEffect, useState } from "react";
import SingleProductOverview from "../../components/SingleProductOverview/SingleProductOverview";
import axios from "axios";
import RelatedProduct from "../../components/RelatedProduct/RelatedProduct";
import style from "./SingleProduct.module.css";
function SingleProduct() {
  const id = "65a6588b7c044c97f2ea28f5";
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  async function getOneProduct() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ENDPOINT}product/byId`,
        { params: { productId: id } }
      );
      if (response) {
        console.log(response.data.data);
        setProduct(response.data.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getOneProduct();
  }, []);
  return (
    !loading && (
      <div className={style.singleProductContainer}>
        <SingleProductOverview product={product} />
        <RelatedProduct product={product} />
      </div>
    )
  );
}

export default SingleProduct;
