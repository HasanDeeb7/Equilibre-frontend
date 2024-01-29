import React, { useEffect, useState } from "react";
import SingleProductOverview from "../../components/SingleProductOverview/SingleProductOverview";
import axios from "axios";
import RelatedProduct from "../../components/RelatedProduct/RelatedProduct";
import style from "./SingleProduct.module.css";
import { useParams } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
function SingleProduct() {
  const slug = useParams();
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  async function getOneProduct() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ENDPOINT}product/byId/${slug.slug}`,

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
    <>
      <Helmet>
        <title>Equilibre - single product</title>
        <meta name="decription" content="" />
      </Helmet>
      !loading && (
      <div className={style.singleProductContainer}>
        <SingleProductOverview product={product} />
        <RelatedProduct product={product} />
      </div>
      )
    </>
  );
}

export default SingleProduct;
