import React from 'react'
import style from './ConfirmedPage.module.css'
import confirmed from '../../assets/confirmed.png'
import { Link } from 'react-router-dom'
const ConfirmedPage = () => {
  return (
    <div className={style.container}>
      <img className={style.image} alt='confirmed' src={confirmed} lazy width={256} heigth={256} />
      <h1 className={style.title}>Order Confirmed</h1>
      <h4>Thank you for choosing Equilibre</h4>
      <p className={style.text}> Your commitment to a healthy lifestyle is appreciated. Once your order is confirmed, it will be prepared and ready to ship within 3 days. Please keep an eye on your inbox for future updates on your order.</p>
      <Link className={style.backShoppingWrap}><button className={style.backShopping}>Back to Shopping</button></Link>
    </div>
  )
}

export default ConfirmedPage
