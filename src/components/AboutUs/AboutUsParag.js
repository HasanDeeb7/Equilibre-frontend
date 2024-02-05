import React from 'react'
import Style from './AboutUs.module.css'
function AboutUsParag({ title, parag_a, parag_b, parag_c }) {
    return (
        <div className={Style.container}>
            <article className={Style.articlee}>
                <h1>{title} </h1>
                <div className={Style.div}>
                    <p className={Style.p_}>
                        <span>Community:</span>{parag_a}
                    </p>
                    <p className={Style.p_}>
                        <span>Integrity:</span>{parag_b}
                    </p>
                    <p className={Style.p_}>
                        <span>Personalization:</span>{parag_c}
                    </p>
                </div>
            </article>
        </div>
    )
}

export default AboutUsParag