import style from './OrderedProducts.module.css'
import React from 'react'

const OrderedProducts = ({ formData }) => {
    const country = formData.country;
    const orderedProducts = JSON.parse(localStorage.getItem("Cart"))
    console.log(orderedProducts);
    const totalQuantity = (orderedProducts!==null) ? orderedProducts.reduce((accumulator, item) => {
        return accumulator + item.quantityPrice
    }, 0) : 0

    const checkDelivery = (totalPrice, country) => {
        if (totalPrice >= 50) return 0
        else if (country === 'lebanon') return 3
        else if (country === undefined) return 0
        else return 'selected later'
    }



    return (
       (orderedProducts!==null)?<div className={style.bill}>
            <section className={style.products}>

                {orderedProducts.map(elt => (
                    <section className={style.productDetails}>
                        <figure>
                            <img src={elt.image} alt={elt.name} width={80} className={style.image} />
                        </figure>
                        <section >
                            <p className={style.productName}>{elt.name}<span className={style.size}>({elt.sizes[0].capacity}{elt.sizes[0].unit})</span></p>
                            <p className={style.productPrice}>${elt.sizes[0].price} <span className={style.quantity}>(x{elt.quantity})</span></p>
                        </section>
                    </section>
                ))}


            </section>
            <section className={style.subTotal}>
                <p className={style.price}>
                    subTotal: <span>${totalQuantity}</span>
                </p>
                <p className={style.price}>Shipping Fee: {(checkDelivery(totalQuantity, country) === 0) ? <span> free delivery</span> : <span>$ {checkDelivery(totalQuantity, country)}</span>}</p>
            </section>
            <p className={style.total}>Total <span > $ {totalQuantity + checkDelivery(totalQuantity, country)}</span></p>
        </div>
        :<div>Emtyyyyy cartttttttttt</div>
    )
}

export default OrderedProducts
