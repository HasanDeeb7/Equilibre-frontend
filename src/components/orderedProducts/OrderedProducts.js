import style from './OrderedProducts.module.css'
import React from 'react'

const OrderedProducts = ({ formData }) => {
    const country = formData.country;
    const orderedProducts = JSON.parse(localStorage.getItem("Cart")) || []
    console.log(orderedProducts);
    const totalQuantity = orderedProducts.reduce((accumulator, item) => {
        return accumulator + item.quantityPrice
    }, 0)

    const checkDelivery = (totalPrice, country) => {
        if (totalPrice >= 50) return 0
        else if (country === 'lebanon') return 3
        else return null
    }

    
    return (
        (orderedProducts.length >0) ? 
        (<div className={style.bill}>
            <section className={style.products}>
                    {orderedProducts.map((elt, i) => {
                        const selectedSize = elt.sizes.find(size => size._id === elt.size);

                        return (
                            <section className={style.productDetails} key={i}>
                                <figure>
                                    <img src={elt.image} alt={elt.name} width={80} className={style.image} />
                                </figure>
                                <section>
                                    {selectedSize && (
                                        <div>
                                            <p className={style.productName}>{elt.name}<span className={style.size}>({selectedSize.capacity}{selectedSize.unit})</span></p>
                                            <p className={style.productPrice}>${selectedSize.price} <span className={style.quantity}>(x{elt.quantity})</span></p>
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
            : <div>Emtyyyyy cartttttttttt</div>
    )
}

export default OrderedProducts