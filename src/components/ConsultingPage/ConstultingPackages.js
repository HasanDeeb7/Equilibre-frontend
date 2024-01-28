import React from 'react'
import image from '../../assets/Hero2Eq2.png'
import Line from '../../assets/svgComponent/LineSVG'
import Style from './ConsutlingPackages.module.css'
function ConstultingPackages({
    img,
    packages,
    cost,
    duration,
    list_a,
    list_b,
    list_c,
    list_d,
    isReverse = false
}) {
    return (
        <section className={isReverse?Style.section:Style.reverse}>
            <article className={Style.article_a}>
                <img src={image} width="100%"  height="90%"  />
            </article>
            <article className={isReverse?Style.article_b:Style.article_bb}>
                <Line />
                <h1 className={Style.h1}>Package {packages}: diet plan</h1>
                <div>
                    <span className={Style.span}>Cost: ${cost}</span>
                    <span className={Style.span}>Duration: {duration} month</span>
                    <span className={Style.span}>What's included?</span>
                </div>
                < ul className={Style.list}>
                    <li>{list_a}</li>
                    <li>{list_b}</li>
                    <li>{list_c}</li>
                    <li>Customized diet plan.</li>
                    {list_d && <li>{list_d}</li>}
                </ul>
            </article>
        </section>
    )
}

export default ConstultingPackages