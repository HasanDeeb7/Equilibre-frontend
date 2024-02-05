import React from "react";
import style from "./GlobalOffer.module.css";
import Input from "../Input/Input";
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';
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
          control="rate"
          label="Rate"
          type="number"
          required
        />
        <Input 
            value={globalOffer}
            setValue={setGlobalOffer}
            control="description"
            label="Description"
            type="text"
            />
            <Flatpickr
            className={style.calendar}
        placeholder="Start Date"
        value={globalOffer.startDate}
        onChange={(selectedDates) => {
          const startDate = selectedDates[0];
          setGlobalOffer((prevData) => ({
            ...prevData,
            startDate,
            endDate: prevData.endDate && startDate > prevData.endDate ? startDate : prevData.endDate,
          }));
        }}
        options={{
          enableTime: false,
          dateFormat: 'Y-m-d',
        }}
      />
      <Flatpickr
        placeholder="End Date"
        className={style.calendar}
        value={globalOffer.endDate}
        onChange={(selectedDates) => {
          const endDate = selectedDates[0];
          setGlobalOffer((prevData) => ({
            ...prevData,
            endDate: endDate > prevData.startDate ? endDate : prevData.startDate,
          }));
        }}
        options={{
          enableTime: false,
          dateFormat: 'Y-m-d',
          minDate: globalOffer.startDate || 'today',
        }}
      />
     
      </div>
    </div>
  );
}

export default GlobalOfferForm;
