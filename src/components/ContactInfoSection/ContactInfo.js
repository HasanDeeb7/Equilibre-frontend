import facebookIcon from "../../assets/facebook 1.svg";
import InstaIcon from "../../assets/instagram 1.png";
import PhoneIcon from "../../assets/phone 1.png";
import locationIcon from "../../assets/gps 1.png";
import style from "./ContactInfo.module.css";

const ContactInfo = () => {
  return (
    <>
      <section className={style.contactInfoContainer}>
        <article className={style.socialIconsContainer}>
          <h2 className={style.followUs}>Follow Us</h2>
          <div className={style.iconsWrapper}>
            <div className={style.icon}>
              <img alt="facebook icon" src={facebookIcon}></img>
            </div>
            <div className={style.icon}>
              <img alt="instagram icon" src={InstaIcon}></img>
            </div>
          </div>
        </article>
        <article className={style.phoneContainer}>
          <img src={PhoneIcon} alt="phone icon"></img>
          <p className={style.number}>+94 4444 5555 6</p>
        </article>
        <address className={style.locationContainer}>
          <img src={locationIcon} alt="location icon"></img>
          <p className={style.location}>Lebanon, Tripoli, Khan Al Saboun</p>
        </address>
      </section>
    </>
  );
};
export default ContactInfo;
