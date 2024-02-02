import React from "react";
import style from "./GlobalOffer.css";
import Input from "../Input/Input";

function GlobalOfferForm({ newGlobalOffer, setNewGlobalOffer }) {
  console.log(newGlobalOffer)
  return (
    <div>
      <div className={style.formContainer}>
        <Input
          value={newGlobalOffer.title || ""}
          setValue={setNewGlobalOffer}
          control="title"
          label="Title"
          required
        />
        <Input
          value={newGlobalOffer.startDate || ""}
          setValue={setNewGlobalOffer}
          control="startDate"
          label="Start Date"
          type="date"
          required
        />
        <Input
          value={newGlobalOffer.endDate || ""}
          setValue={setNewGlobalOffer}
          control="endDate"
          label="End Date"
          type="date"
          required
        />
        <Input
          value={newGlobalOffer.rate || 0}
          setValue={setNewGlobalOffer}
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
