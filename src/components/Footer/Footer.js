import { useState } from "react";
import Styles from "./Footer.module.css"
import axios from "axios";
const Footer = () => {
    const [formData, setFormData] = useState({
        email: '',
        text: '',
    });
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevformData) => ({
            ...prevformData,
            [name]: value,
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.email || !formData.text) {
            return alert('Please fill in both email and message fields.');
        }
        const endpoint = 'http://localhost:3000/send-message';
    
        axios.post(endpoint, formData)
            .then(response => {
                alert(response.data.message);
                setFormData({
                    email: '',
                    message: '',
                });
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while sending the message.');
            });
    }

return (
    <header className={Styles.footer}>
        <div>
            <h1>Equilibre</h1>
            <p className={Styles.parag}>Your natural product made for your sanity and for your well-being.</p>
        </div>
        <ul>
            <li>Discovery</li>
            <li>New season</li>
            <li>Most searched</li>
            <li>Most selled</li>
        </ul>
        <ul>
            <li>About</li>
            <li>Help</li>
            <li>Shipping</li>
            <li>Affiliate</li>
        </ul>
        <ul>
            <li>info</li>
            <li>Contact us</li>
            <li>Privacy Policies</li>
            <li>Terms & Conditions</li>
        </ul>
        <div>
            <p className={Styles.contactUs}>Contact us : (+961) 70 820 265</p>
            <div className={Styles.message}>
                <span className={Styles.messageUs}>Message us :</span>
                <form className={Styles.form}>
                    <input type="email"
                        placeholder="your email"
                        className={Styles.firstInput}
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}></input>
                    <input type="text"
                        placeholder="your message..."
                        name="text"
                        value={formData.text}
                        onChange={handleInputChange}
                        className={Styles.secondInput}></input>
                    <button type="submit" onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </div>

    </header>
)
}

export default Footer