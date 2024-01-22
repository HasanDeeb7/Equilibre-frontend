import React, { useState } from 'react';
import { useUserStore } from '../../Store.js';
import style from './Shipping.module.css';
import { Link } from 'react-router-dom'
import Select from 'react-select';
const Shipping = ({ onFormDataChange }) => {
    const customStyles = {
        control: (defaultStyles, state) => ({
            ...defaultStyles,
            ...style.selector,
            border: '0 !important',
            boxShadow: '0 !important',
            '&:hover': {
                border: '0 !important'
            },
            fontSize: '14px'
        }),
        option: (defaultStyles, state) => ({
            ...defaultStyles,
            color: 'black',
            backgroundColor: state.isFocused ? '#B7CF33' : 'white',
            fontSize: '14px'

        })
    };

    const countries = [
        { value: 'lebanon', label: 'Lebanon' },
        { value: 'Qatar', label: 'Qatar' },
        { value: 'Emirat', label: 'Emirat' },
        { value: 'Egypt', label: 'Egypt' },
        { value: 'Moroco', label: 'Moroco' },
        { value: 'France', label: 'France' },
        { value: 'Australia', label: 'Australia' },
    ];

    const cities = {
        lebanon: [
            { value: 'Beirut', label: 'Beirut' },
            { value: 'Tripoli', label: 'Tripoli' },
            { value: 'Sidon', label: 'Sidon' },
            { value: 'Tyre', label: 'Tyre' },
            { value: 'Baalbek', label: 'Baalbek' },
            { value: 'Zahle', label: 'Zahle' },
            { value: 'Nabatieh', label: 'Nabatieh' },
            { value: 'Saida', label: 'Saida' },
            { value: 'Jounieh', label: 'Jounieh' },
            { value: 'Byblos', label: 'Byblos' },
            { value: 'Akkar', label: 'Akkar' },
        ],

    };



    const { user } = useUserStore();
    // const [edit, setEdit] = useState(false);
    const [formData, setFormData] = useState({
        email: 'email@gmail.com',
        country: '',
        city: '',
        firstName: '',
        lastName: '',
        shippingAddress: '',
        phone: '',
        paymentMethod: ''
    });


    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

    };

    const handleChangeSelector = (selectedOption, field) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: selectedOption.value,
        }));
    };

    const createOrder=async()=>{
        const newOrder=await axios.post(`${process.env.REACT_APP_ENDPOINT}/order/addNewOrder`)

    }

    const handelSubmit = () => {
        console.log(formData)
        onFormDataChange(formData)
        // createOrder(form)
        setFormData({
            email: '',
            country: '',
            city: '',
            firstName: '',
            lastName: '',
            shippingAddress: '',
            phone: '',
            paymentMethod: ''
        })
        console.log(formData)
    }
    return (
        <div className={style.shippingInfo}>
            <section className={style.contactInfo}>
                <label htmlFor='email' className={style.emailLabel}>
                    Contact
                </label>

                <input
                    value={formData.email}
                    id='email'
                    name='email'
                    type='email'
                    className={style.emailField}
                    onChange={handleChange}
                    placeholder='Email'
                    required
                />

                {/* <input
                        value={formData.email}
                        id='email'
                        name='email'
                        type='email'
                        className={style.emailField}
                        disabled
                    /> */}

                {/* <button className={style.editButton} onClick={() => setEdit(!edit)}>
                    Edit
                </button> */}
            </section>

            <section>
                <h3>Delivery</h3>
                <label htmlFor='country'>

                </label>

                <Select
                    name='country'
                    id='country'
                    options={countries}
                    onChange={(selectedOption) => handleChangeSelector(selectedOption, 'country')}
                    value={countries.find((option) => option.value === formData.country)}
                    className={style.selector}
                    placeholder="Select Country"
                    styles={customStyles}
                    required
                />

                {formData.country === 'lebanon' && (
                    <Select
                        name='city'
                        id='city'
                        options={cities.lebanon}
                        onChange={(selectedOption) => handleChangeSelector(selectedOption, 'city')}
                        value={cities.lebanon.find((option) => option.value === formData.city)}
                        className={style.selector}
                        placeholder="Select City"
                        styles={customStyles}
                        required
                    />
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
                            required
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
                            required
                        />
                    </label>
                </section>

                <input
                    value={formData.shippingAddress}
                    name='shippingAddress'
                    type='text'
                    className={style.selector}
                    onChange={handleChange}
                    placeholder='Address (e.g :Rue, Floor, Apartment) '
                    required
                />

                <input
                    value={formData.phone}
                    name='phone'
                    type='text'
                    className={style.selector}
                    onChange={handleChange}
                    placeholder='Phone number'
                    required
                />
            </section>
            <h3 className={style.paymentTitle}>Payment</h3>
            <section className={style.payment}>

                <label>
                    <input
                        value='USD'
                        name='paymentMethod'
                        type='radio'
                        className={style.paymentMethod}
                        onChange={handleChange}
                        required
                    />
                    Cash On Delivery (USD)
                </label>

                <label>
                    <input
                        value='LBP'
                        name='paymentMethod'
                        type='radio'
                        className={style.paymentMethod}
                        onChange={handleChange}
                        required
                    />
                    Cash On Delivery (LBP on daily rate)
                </label>
            </section>
            <nav className={style.navSection}>
                <Link path='/cart' className={style.navLink}>Back to cart</Link>
                <button className={style.completeOrder} onClick={handelSubmit}> Complete Order</button></nav>
        </div>
    );
};

export default Shipping;
