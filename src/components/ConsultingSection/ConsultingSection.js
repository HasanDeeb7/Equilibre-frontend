import style from "./ConsultingSection.module.css";
import { Link } from "react-router-dom";
import image from "../../assets/consulting.svg";
import { motion } from "framer-motion";
const ConsultingSection = () => {
  return (
    <>
      <motion.section
        initial={{ x: window.innerWidth }}
        animate={{ x: 0 }}
        exit={{ x: window.innerWidth }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.35, 1] }}
        className={style.consultingSection}
      >
        <div className={style.textContainer}>
          <ul>
            <li>Discussing and analyzing current eating habits of clients.</li>
            <li>
              Educating clients about the importance of specific foods and
              nutrients.
            </li>
            <li>
              Studying health histories to determine specific nutritional
              requirements.
            </li>
            <li>
              Developing meal plans for individuals to promote health and
              wellbeing.
            </li>
          </ul>
          <Link to="/about">
            <button className={style.btn}>Read more</button>
          </Link>
        </div>
        <img className={style.img} alt="consulting" src={image}></img>
      </motion.section>
    </>
  );
};
export default ConsultingSection;
