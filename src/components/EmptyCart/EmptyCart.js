import React from 'react'
import { Link } from 'react-router-dom'
import emtyCart from '../../assets/emptyCart.jpg'
import style from './EmptyCart.module.css'
const EmtyCart = () => {
  return (
    <div className={style.container}>
      <img src={emtyCart} alt='emty cart' lazy width={800} className={style.image} />
      <p className={style.text}>There is nothing in your cart</p>
      <Link to='/products'><button className={style.shopButton}>Shop now</button></Link>
    </div>
  )
}

export default EmtyCart
