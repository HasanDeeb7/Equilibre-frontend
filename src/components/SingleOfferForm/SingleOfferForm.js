import React, { useEffect, useState } from "react";
import style from "./SingleOfferForm.module.css";
import Select from 'react-select';
import axios from 'axios'
import Input from "../Input/Input";
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';
function SingleOfferForm({ singleOffer, setSingleOffer }) {
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])
   console.log(singleOffer)


    //get all products
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${process.env.REACT_APP_ENDPOINT}product/AllProducts`);
                if (response) {
                    setProducts(response.data.data);
                    console.log(response.data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
    
        fetchData();

    }, []);
    const handleProductSelection = (selectedOptions) => {
        let selectedProducts = selectedOptions.map((option) => ({
            value: option.value,
            label: option.label,
        }));
    
        setSingleOffer((prevData) => ({
            ...prevData,
            products: selectedProducts.map((obj) => obj.value),
        }));
    };
    const customStyles = {
        control: (defaultStyles) => ({
            ...defaultStyles,
            borderColor: 'black',
            boxShadow: '0 !important',
            '&:hover': {
                borderColor: 'black',
            },
            fontSize: '16px',
            color:'black',
        }),
        option: (defaultStyles, state) => ({
            ...defaultStyles,
            color: 'black',
            backgroundColor: state.isFocused ? '#B7CF33' : 'white',
            fontSize: '14px'

        })
    };
    console.log(singleOffer)
    return (
        <div>
                {(products.length===0 && loading)?<div>loading...</div>:

            <div className={style.formContainer}>
                <Input
                    value={singleOffer}
                    setValue={setSingleOffer}
                    control="discountRate"
                    label="Discount Rate"
                    type="number"
                    required
                />
            <Flatpickr
            className={style.calendar}
              id="start-date"
              placeholder="Select start date"
              value={singleOffer.startDate}
              onChange={(selectedDates) => setSingleOffer((prevData) => ({
                ...prevData,
                startDate: selectedDates[0],
                endDate: prevData.endDate && selectedDates[0] > prevData.endDate ? selectedDates[0] : prevData.endDate,
              }))}
              options={{
                enableTime: false,
                dateFormat: 'Y-m-d',
              }}
             
            />
    
            <Flatpickr
            className={style.calendar}
              id="end-date"
              placeholder="Select end date"
              value={singleOffer.endDate}
              onChange={(selectedDates) => setSingleOffer((prevData) => ({
                ...prevData,
                endDate: selectedDates[0] > prevData.startDate ? selectedDates[0] : prevData.startDate,
              }))}
              options={{
                enableTime: false,
                dateFormat: 'Y-m-d',
                minDate: singleOffer.startDate || 'today',
              }}
             
            />

                <Select
                    name='products'
                    id='products'
                    options={products.map((product) => ({
                        value: product._id,
                        label: product.name,
                    }))}
                    onChange={handleProductSelection}
                    isMulti ={true}
                    className={style.selector}
                    placeholder="Select Products"
                    styles={customStyles}
                />
            </div>}
        </div>
    );
}

export default SingleOfferForm;
