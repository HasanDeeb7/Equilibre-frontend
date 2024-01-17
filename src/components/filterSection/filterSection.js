import React from 'react'
import Styles from './filterSection.module.css'
const FilterSection = () => {
  return (
    <section className={Styles.FilterSection}>
      <div className={Styles.title}>
        <p>Categories</p>
        <span>Reset</span>
      </div>
      <div className={Styles.categories}>
        <div className={Styles.checkContent}>
          <input type='checkbox' id='allCategories' className={Styles.checkbox} /><label for="allCategories">All Categories</label>
        </div>
        <span>10</span>
      </div>
      <div className={Styles.categories}>
        <div className={Styles.checkContent}>
          <input type='checkbox' id='allCategories' className={Styles.checkbox} /><label for="allCategories">All Categories</label>
        </div>
        <span>10</span>
      </div>
      <div className={Styles.line} />
      <div className={Styles.title}>
        <p>Price</p>
        <span>Reset</span>
      </div>

      <div className={Styles.categories}>
        <div className={Styles.checkContent}>
          <input type='checkbox' id='allCategories' className={Styles.checkbox} /><label for="allCategories">0$ - 10$</label>
        </div>
        <span>10</span>
      </div>

      <div className={Styles.categories}>
        <div className={Styles.checkContent}>
          <input type='checkbox' id='allCategories' className={Styles.checkbox} /><label for="allCategories">10$ - 20$</label>
        </div>
        <span>10</span>
      </div>
      <div className={Styles.categories}>
        <div className={Styles.checkContent}>
          <input type='checkbox' id='allCategories' className={Styles.checkbox} /><label for="allCategories">20$ - 30$</label>
        </div>
        <span>10</span>
      </div>
      <div className={Styles.categories}>
        <div className={Styles.checkContent}>
          <input type='checkbox' id='allCategories' className={Styles.checkbox} /><label for="allCategories">30$ - 50$</label>
        </div>
        <span>10</span>
      </div>

    </section>
  )
}

export default FilterSection

