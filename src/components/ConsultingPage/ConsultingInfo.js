import React, { useState } from 'react'
import Style from './ConsultingInfo.module.css'
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
function ConsultingInfo() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    phone: "",
    packages: "",
    email: "",
    message: ""
  })
  const [isLoading, setisLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

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

  const handleSubmit = (event) => {
    event.preventDefault();
    setisLoading(true)
    emailjs.sendForm(process.env.REACT_APP_SERVICE_ID,process.env.REACT_APP_TEMPLATEFORCONSULTING_ID,event.target,process.env.REACT_APP_PUBLIC_KEY)

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
    <section className={Style.section}>
      <h1>Book Now</h1>
      <span>Consulting for Health and Vitality.</span>
      <form className={Style.form} onSubmit={handleSubmit}>
        <div className={Style.inputs}>
          <div className={Style.labelInput}>
            <label htmlFor="firstName">First Name</label>
            <input
              type='text'
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              id='firstName'
              className={Style.inputText}
              required
            />
          </div>
          <div className={Style.labelInput}>
            <label htmlFor="lastName">Last Name</label>
            <input
              type='text'
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={Style.inputText}
              id='lastName'
              required
            />
          </div>
        </div>
        <div className={Style.inputs}>

          <div className={Style.labelInput}>
            <label htmlFor="age">Age</label>
            <input
              type='text'
              name="age"
              value={formData.age}
              onChange={handleChange}
              id='age'
              className={Style.inputText}
              required
            />
          </div>
          <div className={Style.labelInput}>
            <label htmlFor="phone">Phone</label>
            <input
              type='phone'
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              id='phone'
              className={Style.inputText}
              required
            />
          </div>
        </div>

        <div className={Style.labelInput}>
          <label htmlFor="packages">Package</label>
          <input
            type='text'
            name="packages"
            value={formData.packages}
            onChange={handleChange}
            className={Style.packages}
            id='packages'
            required
          />
        </div>
        <div className={Style.labelInput}>
          <label htmlFor="email">Email Address</label>
          <input
            type='email'
            name="email"
            value={formData.email}
            className={Style.email}
            onChange={handleChange}
            id='email'
            required
          />
        </div>
        <div className={Style.labelInput}>
          <label htmlFor="message">Message (if you have any health problem please mention it below)</label>
          <textarea
            type='texteara'
            name="message"
            className={Style.message}
            value={formData.message}
            onChange={handleChange}
            id='message'

          />
        </div>
        <button type='submit' disabled={isLoading} className={Style.btn}>Get in touch</button>
      </form>
    </section>
  )
}

export default ConsultingInfo