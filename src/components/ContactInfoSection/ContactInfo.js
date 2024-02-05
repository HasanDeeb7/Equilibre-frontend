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
              <a
                href="https://www.facebook.com/equilibreka?mibextid=ZbWKwL"
                rel="noreferrer"
                target="_blank"
              >
                <img alt="facebook icon" src={facebookIcon}></img>
              </a>
            </div>
            <div className={style.icon}>
              <a
                href="https://www.instagram.com/equilibre.lb?igsh=MjJ3dWlweXk2N3Z4"
                rel="noreferrer"
                target="_blank"
              >
                <img alt="instagram icon" src={InstaIcon}></img>
              </a>
            </div>
          </div>
        </article>
        <article className={style.phoneContainer}>
          <img src={PhoneIcon} alt="phone icon"></img>
          <p className={style.number}>+961 70820265</p>
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
