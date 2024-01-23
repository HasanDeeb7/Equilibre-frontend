import style from "./TestimonialCard.module.css";
const TestimonialCard = ({content,image,author}) => {
  console.log(content,image,author)
  return (
    <>
      <div className={style.CardContainer}>
        <img className={style.image} src={image} alt="reviewer"></img>
        <p className={style.reviewText}>“{content}”</p>
        <p className={style.reviewName}>{author}</p>
      </div>
    </>
  );
};
export default TestimonialCard;
