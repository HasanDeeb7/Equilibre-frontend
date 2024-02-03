import React from "react";
import style from "./GlobalOffer.module.css";
import Input from "../Input/Input";

function GlobalOfferForm({ globalOffer, setGlobalOffer }) {
  console.log(globalOffer)
  return (
    <div>
      <div className={style.formContainer}>
        <Input
          value={globalOffer}
          setValue={setGlobalOffer}
          control="title"
          label="Title"
          required
        />
        <Input
          value={globalOffer}
          setValue={setGlobalOffer}
          control="startDate"
          label="Start Date"
          type="date"
          required
        />
        <Input
          value={globalOffer}
          setValue={setGlobalOffer}
          control="endDate"
          label="End Date"
          type="date"
          required
        />
        <Input
          value={globalOffer}
          setValue={setGlobalOffer}
          control="rate"
          label="Rate"
          type="number"
          required
        />
      </div>
    </div>
  );
}

export default GlobalOfferForm;
