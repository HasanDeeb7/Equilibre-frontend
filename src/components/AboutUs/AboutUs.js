import React from 'react'
import Style from './AboutUs.module.css'
function AboutUsComponent({title,parag,image, isReverse = false}) {
    return (
        <main className={Style.main}>
            <article className={isReverse? Style.article_a: Style.reverse}>
                <aside className={Style.aside_a}>
                    <h1 className={Style.h1}>{title}</h1>
                    <p className={Style.p}>{parag}</p>
                </aside>
                <aside className={Style.aside_aa}>
                    <img src={image} />
                </aside>
            </article>

        </main>
    )
}

export default AboutUsComponent