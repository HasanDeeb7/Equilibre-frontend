import aboutStyle from "./AboutUsSection.module.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const AboutUsSection = () => {
  return (
    <motion.div
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // transition={{ delay: 0.5 }}
    >
      <section className={aboutStyle.aboutUsSection}>
        <div className={aboutStyle.textContainer}>
          <h2 className={aboutStyle.title}> About Us </h2>
          <p className={aboutStyle.point}>Equilibre Unveiled:</p>
          <p className={aboutStyle.text}>
            Founder Kawthar Alawa welcomes you to more than a store a
            captivating space designed for your well-being journey.
          </p>
          <p className={aboutStyle.point}>Thriving in Balance:</p>
          <p className={aboutStyle.text}>
            Dive into a world where passion meets purpose, as we empower you to
            achieve vitality through personalized nutrition and lifestyle
            choices.
          </p>
          <Link to="/about">
            <button className={aboutStyle.btn}>Read more</button>
          </Link>
        </div>
        <iframe
          className={aboutStyle.video}
          title="the story of equilibre"
          height="345"
          frameborder="0"
          src="https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1"
        ></iframe>
      </section>
    </motion.div>
  );
};
export default AboutUsSection;
