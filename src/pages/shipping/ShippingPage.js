import OrderedProducts from "../../components/orderedProducts/OrderedProducts";
import Shipping from "../../components/shipping/Shipping";
import React, { useState } from 'react'
import style from './shippingPage.module.css'

const ShippingPage = () => {

  const [shippingInfo,setShippingInfo]=useState({})
  const handleFormDataChange = (newFormData) => {
    setShippingInfo(newFormData);
  };
  return (
    <div className={style.container}>
        <Shipping onFormDataChange={handleFormDataChange}/>
      <OrderedProducts formData={shippingInfo}/>
    </div>
  )
}



export default ShippingPage
