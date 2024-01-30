import { useState } from "react";
import FormStyle from "./ContactUsForm.module.css";
import emailjs from '@emailjs/browser';
import {  toast } from 'react-toastify';
const ContactUsForm = () => {
  const [isLoading, setisLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      age: "",
      phone: "",
      packages: "",
      email: "",
      message: ""
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setisLoading(true)
    emailjs.sendForm(`${process.env.REACT_APP_SERVICE_ID}, ${process.env.REACT_APP_TEMPLATEFORCONTACTUS_ID}, ${e.target}, ${process.env.REACT_APP_PUBLIC_KEY}`)

      .then((result) => {
        if (result.status) {
          resetForm()
          console.log(result);
          setisLoading(false)
          toast.success('Email Sent Successfully')
        }
      }, (error) => {
        console.log(error);
        setisLoading(false);
        toast.error("An error occurd, email wasn't sent");


      });
  };

  return (
    <>
      <section className={FormStyle.FormSection}>
        <h2 className={FormStyle.contactTitle}>Contact Us</h2>
        <p className={FormStyle.contactSubTitle}>Feel free to reach out to us with any questions or concerns.</p>
        <form className={FormStyle.FormContainer} onSubmit={handleSubmit}>
          <div className={FormStyle.nameContainer}>
            <div className={FormStyle.divNameContainer}>
              <label className={FormStyle.nameLabel}>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                className={FormStyle.nameInput}
                onChange={handleChange}
                required
              />
            </div>
            <div className={FormStyle.divNameContainer}>
              <label className={FormStyle.nameLabel}>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                className={FormStyle.nameInput}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <label className={FormStyle.inputLabel}>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={FormStyle.emailInput}
            required
          />

          <label className={FormStyle.inputLabel}>Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={FormStyle.message}
            required
          />

          <button className={FormStyle.ContactBtn} type="submit">
            Get In Touch
          </button>
        </form>
      </section>
    </>
  );
};
export default ContactUsForm;
