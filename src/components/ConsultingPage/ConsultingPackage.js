import React from 'react'
import image from '../../assets/Hero2Eq2.png'
import Style from "./ConsultingPackage.module.css"
function ConsultingPackage() {
  return (
    <header className={Style.header}>
      <section className={Style.container}>
        <h1>Action sentence for consultation</h1>
        <article>

          <h2>My Food Philosophy</h2>
          <ul className={Style.list}>
            <li>
              Empowering individuals to embrace
              a lifestyle focused on wellness and vitality.
            </li>
            <li>
              Providing evidence-based dietary
              guidance to make informed nutritional choices.
            </li>
            <li>
              Offering a collection of delicious
              and wholesome recipes for a balanced diet.
            </li>
            <li>
              Fostering a supportive community
              dedicated to mindful eating and healthy living.
            </li>
            <li>
              Inspiring individuals on their
              journey to optimal health and happiness through nutrition.
            </li>
          </ul>
        </article>
      </section>
        <img src={image} className={Style.img}  />
    </header>
  )
}

export default ConsultingPackage