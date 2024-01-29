import React, { useEffect, useState } from 'react'
import Style from './UserProfile.module.css'
import UserImage from '../../assets/userImage.png'
import axios from 'axios'
import { useUserStore } from '../../Store'
import { toast } from "react-toastify";
const EditeUserProfile = () => {
    const { user, setUser } = useUserStore();
    const [formData, setFormData] = useState({
        name: user.username,
        email: user.email,
        address: user.location,
        phoneNumber: user.phone,
        gender: user.gender,
        id: user._id
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const handleSaveChanges = async () => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_ENDPOINT}user/update   `, formData)
            if (response.status) {
                toast.success("your profile is updated")
            }
        }
        catch (error) {
            console.log("the user is not updated", error)
            toast.error("your profile is not updated");

        }
    };

    return (
        <>
            <header className={Style.header}></header>
            <article className={Style.article} initial={{ y: -600, x: -225 }}
                animate={{ y: -220, x: -225 }}

                transition={{ type: "spring" }}>
                <img src={UserImage} alt='userImage' className={Style.userImage} />
                <section
                    className={Style.section}>
                    <p>Your Name</p>
                    <div className={Style.edit}>
                        <input
                            type='text'
                            placeholder='Enter Your Name'
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange} />
                    </div>
                    <p>Email</p>
                    <div className={Style.edit}>

                        <input
                            type='email'
                            placeholder='Enter Your Email'
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>

                    <p>Phone Number</p>
                    <div className={Style.edit}>

                        <input
                            type='phone'
                            placeholder='Enter Your Number'
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange} />
                    </div>

                    <p>Adress</p>
                    <div className={Style.edit}>

                        <input
                            type='text'
                            placeholder='Enter Your Address'
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange} />
                    </div>

                    <select
                        id="dropdown"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange} >
                        <option value="Male">Male </option>
                        <option value="Female">Female</option>
                    </select>

                    <button type='submit' className={Style.submit} onClick={handleSaveChanges} > Save Changes</button>

                </section>
            </article>
        </>
    )
}

export default EditeUserProfile