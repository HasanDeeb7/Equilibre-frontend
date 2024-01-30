import React, { useState, useEffect } from "react";
import style from "./ConsultationForm.module.css"
import Input from "../Input/Input";
import { AddCircleOutline } from '@mui/icons-material'
import { TextField } from "@mui/material";
function CategorieForm({ consultation, setConsultation }) {
  const [addDescription, setAddDescription] = useState(consultation.description.length + 1);
  const [descriptionForm, setDescriptionForm] = useState([])
  const handleAddDescription = () => {
    setAddDescription(addDescription + 1);
  };
  const handleChangeDescription = (e) => {
    console.log(e.target.id)

    descriptionForm[0] = e.target.value
    console.log(descriptionForm)

  };

  useEffect(() => {
    const sendDescriptions = () => {
      const updatedDescriptions = Object.values(descriptionForm);
      setConsultation({
        ...consultation,
        description: [...consultation.description, ...updatedDescriptions],
      });
    };
    console.log(descriptionForm)
    sendDescriptions();
  }, [descriptionForm]);


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
        {[...Array(addDescription)].map((_, index) => (
          // <TextField
          //  label={`Description${index}`} name={`Description${index}`} onChange={handleChangeDescription} />
          <TextField key={index}
            id={index}
            label={`Description ${index + 1}`}
            name={`description${index + 1}`}
            value={descriptionForm[`description${index + 1}`] || ''}
            onChange={handleChangeDescription} />
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

export default CategorieForm;
