import React, { useState } from 'react';
import style from './Shipping.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios'
import Select from 'react-select';
import countryList from 'country-list'
import { useUserStore } from '../../Store.js';

const Shipping = ({ onFormDataChange}) => {
// const [isLoading, setLoading]=useState(true)

    const { user } = useUserStore();
    console.log(user)

    ///need update
    const totalQuantity = 30;
    //get all product info from localStorage
    const orderedProducts = []
    JSON.parse(localStorage.getItem("Cart")).map(product => {
        orderedProducts.push({
            product: product._id,
            quantity: product.quantity,
            size: product.size
        })

    })
    console.log(orderedProducts);


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

    //get countries from library
    const countries = [];
    const allCountries = countryList.getData()
    allCountries.map((elt, i) => countries.push(
        {
            value: `${elt.name.toLowerCase()}`,
            label: `${elt.name}`
        }
    ))
    console.log(countries);

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

    const [formData, setFormData] = useState({
        email:user?.email || '',
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

    const createOrder = async (newOrder) => {
        console.log(newOrder)
        try {
            const response = await axios.post(`${process.env.REACT_APP_ENDPOINT}order/addNewOrder`, newOrder)
            if (response) {
                console.log(response.data)
                return response
            }


        } catch (error) {
            console.log(error)
        }
    }

    const handelSubmit = () => {

        onFormDataChange(formData)
        console.log(orderedProducts)
        createOrder({ ...formData, totalAmount: totalQuantity, products: [...orderedProducts], })
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
