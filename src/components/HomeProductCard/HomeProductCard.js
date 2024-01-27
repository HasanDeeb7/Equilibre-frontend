import style from './HomeProductCard.module.css'

 const HomeProductCard =({image,name})=> {
  return (
    <>
      <article className={style.cardContainer}>
        <img src={image} alt={name} className={style.productImage}></img>
        <p className={style.name}>{name}</p>
      </article>
    </>
  )
}
export default HomeProductCard