import { useState } from "react";
import FormStyle from "./ContactUsForm.module.css";
const ContactUsForm = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
    })
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
