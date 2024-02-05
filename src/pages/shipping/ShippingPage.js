import OrderedProducts from "../../components/orderedProducts/OrderedProducts";
import Shipping from "../../components/shipping/Shipping";
import React, { useState } from 'react'
import style from './shippingPage.module.css'
import { Helmet } from 'react-helmet-async';
import EmtyCart from "../../components/EmptyCart/EmptyCart";
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
      {(JSON.parse(localStorage.getItem("Cart"))) ?
        <>
          <Shipping onFormDataChange={handleFormDataChange} />
          <OrderedProducts formData={shippingInfo} />
        </>
        : <EmtyCart />}
    </div>
  )
}



export default ShippingPage
