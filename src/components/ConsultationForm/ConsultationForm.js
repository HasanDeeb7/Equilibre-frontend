import React from "react";
import style from "./ConsultationForm.module.css"
import Input from "../Input/Input";

function CategorieForm({ consultation, setConsultation }) {
  return (
    <div>
      <div className={style.formContainer}>
        <Input
          value={consultation}
          setValue={setConsultation}
          control="name"
          label="Name"
          required
        />
              <Input
          value={consultation}
          setValue={setConsultation}
          control="price"
          label="Price"
          required
        />
              <Input
          value={consultation}
          setValue={setConsultation}
          control="description"
          label="Description"
          required
        />
      </div>
    </div>
  );
}

export default CategorieForm;
