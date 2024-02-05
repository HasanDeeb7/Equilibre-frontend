import { Instagram } from "@mui/icons-material"
import Facebook from "../../assets/svgComponent/Facebook"
import Styles from "./Footer.module.css"
import { Link } from "react-router-dom"
const Footer = () => {
    return (
        <footer className={Styles.footer}>
            <div>
                <h1>Equilibre</h1>
                <p className={Styles.parag}>
                    Your natural product made for your sanity and for your well-being.
                </p>
                <div className={Styles.socialM}>
                    <a href="https://www.facebook.com/equilibreka?mibextid=ZbWKwL" rel="noreferrer" target="_blank">
                        <Facebook />
                    </a>
                    <a href="https://www.instagram.com/equilibre.lb?igsh=MjJ3dWlweXk2N3Z4" rel="noreferrer" target="_blank">
                        <Instagram />
                    </a>
                </div>
            </div>
            <ul>
                <li>Discovery</li>
                <li><Link to='/' className={Styles.Link}>Home</Link></li>
                <li><Link to='/products' className={Styles.Link}>Products</Link></li>
                <li><Link to='/#mostPopular' className={Styles.Link}>Most Popular</Link></li>
            </ul>
            <ul>
                <li>Equilibre</li>
                <li><Link to='/about' className={Styles.Link}>About us</Link></li>
                <li><Link to='/contact' className={Styles.Link}>Contact us</Link></li>
                <li><a href="https://maps.app.goo.gl/gmSAjxwsf14nttKq5" className={Styles.Link}>Location</a></li>
            </ul>
            <ul>
                <li>Clinic</li>
                <li><Link to='/consultation' className={Styles.Link}>Packages</Link></li>
                <li><a href="https://www.google.com/maps/place/34%C2%B026'19.0%22N+35%C2%B050'24.3%22E/@34.4386134,35.8375018,17z/data=!3m1!4b1!4m4!3m3!8m2!3d34.4386134!4d35.8400767?hl=en&entry=ttu" className={Styles.Link}>Location</a></li>
            </ul>

        </footer>
    )
}

export default Footer