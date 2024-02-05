import ContactUsForm from "../../components/ContactUsForm/ContactUsForm"
import HeaderContactUs from "../../components/HeaderContactUs/HeaderContactUs"
import ContactInfo from "../../components/ContactInfoSection/ContactInfo"
import { Helmet } from 'react-helmet-async';
const ContactUsPage = () => {
  return (
    <>
      <Helmet>
        <title>Equilibre - contact us</title>
        <meta name="decription" content="" />
      </Helmet>
      <HeaderContactUs />
      <ContactInfo />
      <ContactUsForm />
    </>
  )
}
export default ContactUsPage