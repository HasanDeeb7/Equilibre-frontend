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
                    <a href="https://www.facebook.com/equilibreka?mibextid=ZbWKwL" target="_blank">
                        <Facebook />
                    </a>
                    <a href="https://www.instagram.com/equilibre.lb?igsh=MjJ3dWlweXk2N3Z4" target="_blank">
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
                <li><Link to='' className={Styles.Link}>Location</Link></li>
            </ul>
            <ul>
                <li>Clinic</li>
                <li><Link to='/consultation' className={Styles.Link}>Packages</Link></li>
                <li><Link to='' className={Styles.Link}>Location</Link></li>
            </ul>

        </footer>
    )
}

export default Footer