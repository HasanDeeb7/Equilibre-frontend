import React, { useState } from 'react';
import { useUserStore } from '../../Store.js';
import style from './Shipping.module.css';
import {Link} from 'react-router-dom'
const Shipping = () => {
    const { user } = useUserStore();
    const [edit, setEdit] = useState(false);
    const [formData, setFormData] = useState({
        email: 'email@gmail.com',
        country: '',
        city: '',
        firstName: '',
        lastName: '',
        shippingAddress: '',
        phone: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className={style.shippingInfo}>
            <section className={style.contactInfo}>
                <label htmlFor='email' className={style.emailLabel}>
                    Contact
                </label>
                {edit ? (
                    <input
                        value={formData.email}
                        id='email'
                        name='email'
                        type='email'
                        className={style.emailField}
                        onChange={handleChange}
                        placeholder='Email'
                    />
                ) : (
                    <input
                        value={formData.email}
                        id='email'
                        name='email'
                        type='email'
                        className={style.emailField}
                        disabled
                    />
                )}
                <button className={style.editButton} onClick={() => setEdit(!edit)}>
                    Edit
                </button>
            </section>

            <section>
                <h3>Delivery</h3>
                <label htmlFor='country'>

                </label>
                <select
                    name='country'
                    id='country'
                    onChange={handleChange}
                    value={formData.country}
                    className={style.selector}
                >
                    <option value='' disabled>
                        Select Country
                    </option>
                    <option value='lebanon'>Lebanon</option>
                    <option value='Qatar'>Qatar</option>
                    <option value='Emirat'>Emirat</option>
                    <option value='Egypt'>Egypt</option>
                    <option value='Moroco'>Moroco</option>
                    <option value='France'>France</option>
                    <option value='Australia'>Australia</option>
                </select>

                {formData.country === 'lebanon' && (
                    <div>
                        <label htmlFor='city' >

                        </label>
                        <select
                            name='city'
                            id='city'
                            onChange={handleChange}
                            value={formData.city}
                            className={style.selector}
                        >
                            <option value='' disabled>
                                Select City
                            </option>
                            <option value='Beirut'>Beirut</option>
                            <option value='Tripoli'>Tripoli</option>
                            <option value='Sidon'>Sidon</option>
                            <option value='Tyre'>Tyre</option>
                            <option value='Baalbek'>Baalbek</option>
                            <option value='Zahle'>Zahle</option>
                            <option value='Nabatieh'>Nabatieh</option>
                            <option value='Saida'>Saida</option>
                            <option value='Jounieh'>Jounieh</option>
                            <option value='Byblos'>Byblos</option>
                            <option value='Akkar'>Akkar</option>
                        </select>
                    </div>
                )}

                <section className={style.nameSection}>

                    <label htmlFor='firstName'>


                        <input
                            value={formData.firstName}
                            name='firstName'
                            type='text'
                            className={style.nameField}
                            onChange={handleChange}
                            placeholder='First Name'
                        />
                    </label>


                    <label htmlFor='lastName'>


                        <input
                            value={formData.lastName}
                            name='lastName'
                            type='text'
                            className={style.nameField}
                            onChange={handleChange}
                            placeholder='Last Name'
                        />
                    </label>
                </section>

                <input
                    value={formData.shippingAddress}
                    name='shippingAddress'
                    type='text'
                    className={style.selector}
                    onChange={handleChange}
                    placeholder='Address'
                />

                <input
                    value={formData.phone}
                    name='phone'
                    type='text'
                    className={style.selector}
                    onChange={handleChange}
                    placeholder='Phone number'
                />
            </section>

            <section className={style.payment}>
                <h3>Payment</h3>
                <label>
                    <input
                        value={formData.shippingAddress}
                        name='shippingAddress'
                        type='radio'
                        className={style.paymentMethod}
                        onChange={handleChange}
                    />
                    Cash On Delivery (USD)
                </label>

                <label>
                    <input
                        value={formData.shippingAddress}
                        name='shippingAddress'
                        type='radio'
                        className={style.paymentMethod}
                        onChange={handleChange}
                    />
                    Cash On Delivery (LBP on daily rate)
                </label>
            </section>
            <nav>
                <Link path='/cart' className={style.navLink}>Back to cart</Link>
            <button type='submit' className={style.completeOrder} onSubmit={()=>{}}> Complete Order</button></nav>
        </div>
    );
};

export default Shipping;
