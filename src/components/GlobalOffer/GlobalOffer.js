import style from './GlobalOffer.module.css'
 const GlobalOffer =({offer})=> {
  return (
    <>
    <section className={style.offerContainer}>
            <p>Don't miss your {offer && offer.title}: {offer && offer.rate}% OFF on all products!</p> 
      </section>
    </>
  )
}
export default GlobalOffer