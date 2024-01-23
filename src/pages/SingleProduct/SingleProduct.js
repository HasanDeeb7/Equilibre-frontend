import React, { useEffect, useState } from "react";
import SingleProductOverview from "../../components/SingleProductOverview/SingleProductOverview";
import axios from "axios";
import RelatedProduct from "../../components/RelatedProduct/RelatedProduct";
import style from "./SingleProduct.module.css";
import { motion } from "framer-motion";
function SingleProduct() {
  const id = "65aafd46f1eb4906132c2837";
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={style.singleProductContainer}
      >
        <SingleProductOverview product={product} />
        <RelatedProduct product={product} />
      </motion.div>
    )
  );
}

export default SingleProduct;
