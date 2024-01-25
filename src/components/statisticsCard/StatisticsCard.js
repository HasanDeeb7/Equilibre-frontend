import React from 'react'
import style from './StatisticsCard.module.css'
const StatisticsCard = ({ title, value, unit, imageSrc }) => {
    return (
        <section className={style.cardContainer}>
            <section className={style.dataContainer}>
                <h4 className={style.title}>{title}</h4>
                <p className={style.data}>{unit}{value}</p>
            </section>
            <figure>
                <img className={style.image} alt={title} src={imageSrc} width={70} lazy />
            </figure>
        </section>
    )
}

export default StatisticsCard
