import React, { useState, useEffect } from 'react';
import style from './Shipping.module.css';
import axios from 'axios';
import {toast} from 'react-toastify'
const ShippingDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    inLebanonDeliveryFee: null,
    FreeDeliveryAmount: null,
  });

  useEffect(() => {
  const fetchShippingDetails = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_ENDPOINT}deliveryDetails`);
      const data = response.data; 
      setFormData({
        inLebanonDeliveryFee: data[0].inLebanonDeliveryFee,
        FreeDeliveryAmount: data[0].FreeDeliveryAmount,
      });
    } catch (error) {
      console.error('Error fetching shipping details:', error);
    }
  };

  fetchShippingDetails();
  }, []);


  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleEditSaveClick = async (e) => {
    e.preventDefault()
    try {
      if (isEditing) {
        const response = await axios.patch(`${process.env.REACT_APP_ENDPOINT}deliveryDetails/update/65b0ca694e71f094bdd485ee`, {
          ...formData,
        });
        toast.success(response.data.message);
      }

      setIsEditing(!isEditing);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className={style.shippingContainer}>
      <h4>Shipping Details</h4>
      <form className={style.form}>
      <label  htmlFor="inLebanonDeliveryFee">
      In Lebanon Delivery Fee: 
      <input
        name="inLebanonDeliveryFee"
        label="In Lebanon Delivery Fee"
        value={formData.inLebanonDeliveryFee}
        onChange={handleInputChange}
        disabled={!isEditing}
        placeholder="In Lebanon Delivery Fee"
        className={style.input}
      /></label>
      <label htmlFor="FreeDeliveryAmount">
      Free Delivery Amount: 
      <input
        name="FreeDeliveryAmount"
        label="Free Delivery Amount"
        value={formData.FreeDeliveryAmount}
        onChange={handleInputChange}
        disabled={!isEditing}
        placeholder="Free Delivery Amount"
        className={style.input}

      />
      </label>
      <button onClick={handleEditSaveClick}  className={isEditing ? style.saveBtn : style.editBtn}>
        {isEditing ? 'Save' : 'Edit'}
      </button>
      </form>
    </section>
  );
};

export default ShippingDetails;
