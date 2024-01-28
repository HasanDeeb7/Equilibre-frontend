import style from "./ConsultingSection.module.css";
import { Link } from "react-router-dom";
import image from "../../assets/consulting.svg";
const ConsultingSection = () => {
  return (
    <>
      <section

        className={style.consultingSection}
      >
        <div className={style.textContainer}>
          <h2 className={style.sectionConsultationTitle}>Consultation</h2>
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
      </section>
    </>
  );
};
export default ConsultingSection;
