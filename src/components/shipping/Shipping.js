import React, { useEffect, useState } from 'react';
import style from './Shipping.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import Select from 'react-select';
import countryList from 'country-list'
import { useUserStore } from '../../Store.js';
import { toast } from 'react-toastify'
import ActionModal from '../ActionModal/ActionModal';
import SuccessModal from '../SuccessModal/SuccessModal';
const Shipping = ({ onFormDataChange }) => {
    const navigate = useNavigate();
    const [modal, setModal] = useState();
    //import user 
    const { user } = useUserStore();
    console.log(user)
    ///need update
    const totalQuantity = localStorage.getItem('totalPrice');
    //get all product info from localStorage
    const orderedProducts = []
    if (JSON.parse(localStorage.getItem("Cart"))) {
        JSON.parse(localStorage.getItem("Cart")).map(product => {
            orderedProducts.push({
                product: product._id,
                quantity: product.quantity,
                size: product.size
            })

        })
    }
    console.log(orderedProducts);


    const customStyles = {
        control: (defaultStyles, state) => ({
            ...defaultStyles,
            ...style.selector,
            width:'100%',
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

    //get countries from library and lebanese cities
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


    //handel form changes
    const [formData, setFormData] = useState({
        email: user?.email || '',
        country: '',
        city: '',
        firstName: '',
        lastName: '',
        shippingAddress: '',
        phone: '',
        paymentMethod: ''
    });


    const handleChange = (e) => {
        e.preventDefault();
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


    //create order with data taken from form and local storage
    const createOrder = async (newOrder) => {
        console.log(newOrder)
        try {
            const response = await axios.post(`${process.env.REACT_APP_ENDPOINT}order/addNewOrder`, newOrder)
            if (response) {
                console.log(response.data)
                setModal('success')
                return response
            }


        } catch (error) {
            console.log(error)
            toast.error('Failed placing this order')
        }
    }

    //to update value in orderedProducts component 
    useEffect(() => {
        onFormDataChange(formData)

    }, [formData])

    const handelConfirmation = () => {
        if (orderedProducts.length === 0) {
            setModal('Empty Cart');
        } else if (
            !formData.country ||
            (formData.country === 'lebanon' && !formData.city) ||
            !formData.firstName ||
            !formData.lastName ||
            !formData.shippingAddress ||
            !formData.paymentMethod ||
            !formData.phone
        ) {
            setModal('Missing Field');
        } else {
            setModal('action');
        }
    };
    //handle submit info to create order
    const handelSubmit = () => {
        if (user) {
            try {
                console.log(orderedProducts)
                createOrder({ ...formData, totalAmount: totalQuantity, products: [...orderedProducts], userId: user._id, orderDate: new Date() })

                setModal('success')
                console.log(formData)
                console.log(modal)
            } catch (error) {
                toast.error('There is an error in sending the order!')
            }finally {
                // setFormData({
                //     email: '',
                //     country: '',
                //     city: '',
                //     firstName: '',
                //     lastName: '',
                //     shippingAddress: '',
                //     phone: '',
                //     paymentMethod: ''
                // })
                // Clear local storage content 
                localStorage.removeItem("Cart");
                localStorage.removeItem("totalPrice");
            }
        }
        else { toast.error('Please log in before proceeding to checkout'); }
    }


    return (
        <>
            {modal === 'action' ? (
                <ActionModal
                    message="Are you sure you want to proceed with this order?"
                    closeHandler={() => setModal(null)}
                    action={handelSubmit}
                />
            ) :

                modal === 'success' ? (
                    <>
                        {<SuccessModal
                            closeHandler={() => setModal(null)}
                            message="Your order was successfully placed!"
                        />}
                    </>
                ) : ""}

            <div className={style.shippingInfo}>

                {modal === `Missing Field` && (
                    <div>
                        {toast.error('Make sure to fill in the required field')}
                        {setModal(null)}
                    </div>
                )}
                {modal === 'Empty Cart' && (
                    <div>
                        {toast.error('Your cart is empty. Add products before confirming the order.')}
                        {setModal(null)}
                    </div>
                )}
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
                    <Link to='/cart' className={style.navLink}>Back to cart</Link>
                    <button type='button' className={style.completeOrder} onClick={handelConfirmation} > Complete Order</button></nav>
            </div>
        </>
    );
};

export default Shipping;
