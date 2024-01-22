import React, { Children, useEffect, useState } from 'react'
import Style from './UserProfile.module.css'
import UserImage from '../../assets/userImage.png'
import { motion } from "framer-motion";

import axios from 'axios'
const EditeUserProfile = () => {
    const [edit1, setEdit1] = useState(true)
    const [edit2, setEdit2] = useState(true)
    const [edit3, setEdit3] = useState(true)
    const [edit4, setEdit4] = useState(true)
    const [userData, setUserData] = useState(true)
    const [sucessEdit, setSucessEdit] = useState(true)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        phoneNumber: '',
        gender: ''
    });
    console.log(formData.gender)
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const handleClick1 = () => {
        setEdit1(prevEdit => !prevEdit)
    }
    const handleClick2 = () => {
        setEdit2(prevEdit => !prevEdit)
    }
    const handleClick3 = () => {
        setEdit3(prevEdit => !prevEdit)
    }
    const handleClick4 = () => {
        setEdit4(prevEdit => !prevEdit)
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("localhost/data")
                setUserData(response.data)
            } catch (error) {
                console.log(error)

            }
        }
    }, [sucessEdit])
    useEffect(() => {

        setFormData({
            name: userData.name,
            email: userData.email,
            address: userData.address,
            phoneNumber: userData.phoneNumber,
            gender: userData.gender
        })
    }, [])
    const handleSaveChanges = () => {

        const endpoint = 'http://your-api-endpoint/update-data';
        axios.post(endpoint, formData)
            .then(response => {
                setSucessEdit(true)
            })
            .catch(error => {
                console.error('Error saving data:', error);
            });
    };

    return (
        <>
            <header className={Style.header}></header>
            <motion.article className={Style.article} initial={{ y: -1000, x: -250 }}
                animate={{ y: -340, x: -250 }}
                
                transition={{ type: "spring" }}>
                <img src={UserImage} alt='userImage' className={Style.userImage} />


                <section

                    className={Style.section}>

                    <p>Your Name</p>
                    <input
                        type='text'
                        placeholder='Enter Your Name'
                        disabled={edit1}
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange} />
                    <button onClick={handleClick1} >Edit</button>

                    <p>Email</p>
                    <input
                        type='email'
                        placeholder='Enter Your Email'
                        disabled={edit2}
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    <button onClick={handleClick2}>Edit</button>

                    <p>Phone Number</p>
                    <input
                        type='phone'
                        placeholder='Enter Your Number'
                        disabled={edit3}
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange} />
                    <button onClick={handleClick3}>Edit</button>

                    <p>Adress</p>
                    <input
                        type='text'
                        placeholder='Enter Your Address'
                        disabled={edit4}
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange} />
                    <button onClick={handleClick4}>Edit</button>

                    <select
                        id="dropdown"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange} >
                        <option value=""></option>
                        <option value="Male">Male </option>
                        <option value="Female">Female</option>
                    </select>

                    <button type='submit' onClick={handleSaveChanges} > Save Changes</button>

                </section>
            </motion.article>
        </>
    )
}

export default EditeUserProfile