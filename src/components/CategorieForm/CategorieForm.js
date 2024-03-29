import React from "react";
import style from "./CategorieForm.module.css"
import Input from "../Input/Input";

function CategorieForm({ categorie, setCategorie }) {
  return (
    <div>
      <div className={style.formContainer}>
        <Input
          value={categorie}
          setValue={setCategorie}
          control="name"
          label="Name"
          required
        />
      </div>
    </div>
  );
}

export default CategorieForm;
