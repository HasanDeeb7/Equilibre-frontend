import React, { useState } from "react";
import style from "./ConsultationForm.module.css"
import Input from "../Input/Input";
import { AddCircleOutline } from '@mui/icons-material'
import { TextField } from "@mui/material";
function ConsultationForm({ consultation, setConsultation, descriptionForm, setDescriptionForm,description }) {
  const [addDescription, setAddDescription] = useState(consultation.description.length + 1);
  const handleAddDescription = () => {
    setAddDescription(addDescription + 1);
  };
  // console.log('byeeee', descriptionForm)
  function handleChange(e, index) {
    setDescriptionForm((prevDescriptionForm) => ({
      ...prevDescriptionForm,
      [e.target.name]: e.target.value,
    }));
  }
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
        {description.map((item, index) => (
          <div key={index}>
            <TextField
              label={`Description ${index + 1}`}
              name={`description${index + 1}`}
              value={item || ''}
              onChange={(e) => {description[index] = e.target.value; console.log(description)}}
              required
            />
          </div>
        ))}
        <div className={style.addDescriptionContainer}>
          <button onClick={handleAddDescription}>
            <AddCircleOutline sx={{ backgroundColor: 'var(--primary-color)', borderRadius: '50%' }} />
          </button>
          <p>Add more description</p>
        </div>
      </div>
    </div>
  );
}

export default ConsultationForm;
