import style from './OrderedProducts.module.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import EmptyCard from '../../components/EmptyCart/EmptyCart'
import { toast } from 'react-toastify'
const OrderedProducts = ({ formData }) => {
    const [deliveryDetails, setDeliveryDetails] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        //function to get delivery Details 
        const getDetails = async () => {

            try {
                const deliveryDetails = await axios.get(`${process.env.REACT_APP_ENDPOINT}deliveryDetails`)
                if (deliveryDetails) {
                    console.log(deliveryDetails.data)
                    setDeliveryDetails(deliveryDetails.data[0])
                }


            } catch (error) {
                console.log(error)
                toast.error('Error getting delivery Details')
            }
        }
        getDetails()
    }, [])


    const country = formData.country;
    const orderedProducts = JSON.parse(localStorage.getItem("Cart")) || []
    console.log(orderedProducts);
    // const totalQuantity = orderedProducts.reduce((accumulator, item) => {
    //     return accumulator + item.quantityPrice
    // }, 0)
    const totalQuantity = JSON.parse(localStorage.getItem('totalPrice'));


    const checkDelivery = (totalPrice, country) => {
        if (totalPrice >= deliveryDetails.FreeDeliveryAmount) return 0
        else if (country === 'lebanon') return deliveryDetails.inLebanonDeliveryFee
        else return null
    }


    return (
        (orderedProducts.length > 0 && deliveryDetails) ?
            (<div className={style.bill}>
                <section className={style.products}>
                    {orderedProducts.map((elt, i) => {
                        const selectedSize = elt.sizes.find(size => size._id === elt.size);

                        return (
                            <section className={style.productDetails} key={i}>
                                <figure>
                                    <img src={elt.image} alt={elt.name} width={80} className={style.image} loading='lazy' />
                                </figure>
                                <section>
                                    {selectedSize && (
                                        <div>
                                            <p className={style.productName}>{elt.name}<span className={style.size}>({selectedSize.capacity}{selectedSize.unit})</span></p>
                                            <p className={style.productPrice}>${elt.price} <span className={style.quantity}>(x{elt.quantity})</span></p>
                                        </div>
                                    )}
                                </section>
                            </section>
                        );
                    })}
                </section>
                <section className={style.subTotal}>
                    <p className={style.price}>
                        subTotal: <span>${totalQuantity}</span>
                    </p>
                    <p className={style.price}>
                        Shipping Fee: {
                            checkDelivery(totalQuantity, country) === 0
                                ? <span>Free Delivery</span>
                                : checkDelivery(totalQuantity, country) !== null
                                    ? <span>$ {checkDelivery(totalQuantity, country)}</span>
                                    : <span>To be determined for {formData.country}</span>
                        }
                    </p>
                </section>
                <p className={style.total}>Total  Total <span > $ {totalQuantity + (checkDelivery(totalQuantity, country) !== null ? checkDelivery(totalQuantity, country) : 0)}</span></p>
            </div>)
            : <div>...</div>
    )
}

export default OrderedProducts
