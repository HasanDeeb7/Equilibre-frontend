import React, { useState } from "react";
import style from "./Testimonals.module.css";
import Input from "../Input/Input";

function TestimonialForm({ testimonial, setTestimonial }) {
  // const [data, setData] = useState({
  //   author: testimonial.author || "",
  //   content: testimonial.content || [],
  //   image: testimonial.image || null,
  // });
  return (
    <div>
      <h2>Testimonial</h2>
      <div className={style.formContainer}>
        <Input
          value={testimonial}
          setValue={setTestimonial}
          control="author"
          label="Author"
        />
        <Input
          value={testimonial}
          setValue={setTestimonial}
          control="content"
          label="Content"
        />
        <input type="file" />
      </div>
    </div>
  );
}

export default TestimonialForm;
