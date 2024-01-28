import { Link } from 'react-router-dom'
import style from './HomeProductCard.module.css'

 const HomeProductCard =({image,name})=> {
  return (
    <>
    <Link to={`/single`} style={{ textDecoration: "none" }}>
      <article className={style.cardContainer}>
        <img src={image} alt={name} className={style.productImage}></img>
        <p className={style.name}>{name}</p>
      </article>
      </Link>
    </>
  )
}
export default HomeProductCard