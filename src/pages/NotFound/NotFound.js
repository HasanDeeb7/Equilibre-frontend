import React from 'react'
import Styles from './NotFound.module.css'
import notFound from '../../assets/notfound.png'
import { Link } from 'react-router-dom'

const NotFound = () => {


    return (
        <div className={Styles.imageContainer}>

            <img src={notFound} alt="PAGE NOT FOUND" className={Styles.notFoundImage} />
            <Link to="/"><button className={Styles.goHome}>GO HOME</button></Link>
        </div>
    )
}

export default NotFound