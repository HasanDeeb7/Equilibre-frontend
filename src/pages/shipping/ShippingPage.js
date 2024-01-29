import OrderedProducts from "../../components/orderedProducts/OrderedProducts";
import Shipping from "../../components/shipping/Shipping";
import React, { useState } from 'react'
import style from './shippingPage.module.css'
import { Helmet } from 'react-helmet-async';
const ShippingPage = () => {

  const [shippingInfo, setShippingInfo] = useState({})
  const handleFormDataChange = (newFormData) => {
    setShippingInfo(newFormData);
  };
  return (
    <div className={style.container}>
      <Helmet>
        <title>Equilibre - shipping</title>
        <meta name="decription" content="" />
      </Helmet>
      <Shipping onFormDataChange={handleFormDataChange} />
      <OrderedProducts formData={shippingInfo} />
    </div>
  )
}



export default ShippingPage
