import style from "./HeroSection.module.css";
import img from '../../assets/hero.png';
import NavBar from "../../Layout/NavBar/NavBar";
import facebookIcon from '../../assets/facebook 1.svg'
import InstaIcon from '../../assets/instagram 1.png'
import { Link } from "react-router-dom";
const HeroSection = () => {
  return (
    <>
    <NavBar/>
      <header className={style.heroContainer}>
        <section className={style.textHeroWrap}>
          <h1 className={style.heroTile}>Eat better, Feel good 🌱</h1>
          <p className={style.heroSubTitle}>
            Welcome to Equilibre! Enjoy tasty, natural treats that make you feel
            good. Each bite supports your well-being for a balanced, happy life.
            Start your journey to feel-good eating right here with us.
          </p>
          <Link to="/products">
          <button className={style.exploreBtn}>Explore</button>
          </Link>
          <div className={style.iconsWrapper}>
            <div className={style.icon}>
              <img alt="facebook icon" src={facebookIcon}></img>
            </div>
            <div className={style.icon}>
              <img alt="instagram icon" src={InstaIcon}></img>
            </div>
          </div>
        </section>
        <img alt="products" src={img} className={style.heroimg}></img>
      </header>
    </>
  );
};
export default HeroSection;
