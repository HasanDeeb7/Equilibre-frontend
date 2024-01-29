import React from 'react'
import Styles from './NotFound.module.css'
import notFound from '../../assets/notfound.png'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async';
const NotFound = () => {


    return (
        <div className={Styles.imageContainer}>
<Helmet>
<title>Equilibre - not-found</title>
<meta name="decription" content="" />
</Helmet>

            <img src={notFound} alt="PAGE NOT FOUND" className={Styles.notFoundImage} />
            <Link to="/"><button className={Styles.goHome}>GO HOME</button></Link>
        </div>
    )
}

export default NotFound