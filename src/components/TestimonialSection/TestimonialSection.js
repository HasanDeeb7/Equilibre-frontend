import style from "./TestimonialSection.module.css";
import TestimonialCard from "../TestimonialCard/TestimonialCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowCarousel } from "../ArrowCarousel/ArrowCarousel";
import { useEffect, useState } from "react";
import axios from "axios";

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getProducts() {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_ENDPOINT}testimonial`
        );
        if (response) {
          setTestimonials(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getProducts();
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <ArrowCarousel />,
    prevArrow: <ArrowCarousel />,
    lazyLoad: true,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          nextArrow: null,
          prevArrow: null,
        },
      },
      {
        breakpoint: 1180,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          nextArrow: <ArrowCarousel />,
          prevArrow: <ArrowCarousel />,
        },
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          nextArrow: <ArrowCarousel />,
          prevArrow: <ArrowCarousel />,
        },
      },
    ],
  };

  return (
    <>
      <section className={style.testimonialSection}>
        <h2 className={style.title}>Testimonials</h2>
        <p className={style.text}>Some reviews from our happy customers</p>
        <div className={style.cardWrapper}>
          {loading ? (
            <p>Loading testimonials...</p>
          ) : (
            <Slider {...settings}>
              {testimonials &&
                testimonials.map((testimonial, index) => (
                  <TestimonialCard
                    key={index}
                    author={testimonial.author}
                    image={testimonial.image}
                    content={testimonial.content}
                  />
                ))}
            </Slider>
          )}
        </div>
      </section>
    </>
  );
};
export default TestimonialSection;
