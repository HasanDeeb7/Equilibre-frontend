import React from 'react'
import Styles from './filterSection.module.css'
const FilterSection = ({ name }) => {

  let categories = [
    {
      name: "honey",
      products: ["", "", "", "", ""]
    },
    {
      name: "honey",
      products: ["", "", "", "", "", ""]
    }, {
      name: "honey",
      products: ["", "", "", ""]
    }, {
      name: "honey",
      products: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]
    },
  ]
  return (
    <section className={Styles.FilterSection}>
      <div className={Styles.titleCategory}>
        <h1>Categories</h1>
        <span>Reset</span>
      </div>
      {categories.map((elt) => (
        <div className={Styles.categorie}>
          <div className={Styles.category}>
            <input type='checkbox' id='allCategories' className={Styles.checkbox} />
            <label for="allCategories">{elt.name}</label>
          </div>
          <p>{elt.products.length}</p>
        </div>
      ))}
      <div className={Styles.line}></div>
      <div className={Styles.titlePrice}>
        <h1>Price</h1>
        <span>Reset</span>
      </div>
      <div className={Styles.categorie}>
          <div className={Styles.category}>
            <input type='checkbox' id='allCategories' className={Styles.checkbox} />
            <label for="allCategories">0$ - 10$</label>
          </div>
          <p>5</p>
        </div>
    </section>
  )
}

export default FilterSection

