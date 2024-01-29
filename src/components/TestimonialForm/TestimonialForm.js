import React, { useState } from "react";
import style from "./Testimonals.module.css";
import Input from "../Input/Input";

function TestimonialForm({ testimonial, setTestimonial }) {
  return (
    <div>
      <div className={style.formContainer}>
        <Input
          value={testimonial}
          setValue={setTestimonial}
          control="author"
          label="Author"
          required
        />
        <Input
          value={testimonial}
          setValue={setTestimonial}
          control="content"
          label="Content"
          required
        />
        <input
          type="file"
          onChange={(e) =>
            setTestimonial({ ...testimonial, image: e.target.files[0] })
          }
        />
      </div>
    </div>
  );
}

export default TestimonialForm;
