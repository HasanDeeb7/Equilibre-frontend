import HeroSection from "../../components/HeroSection/HeroSection";
import TopSellerHome from "../../components/TopSellerHome/TopSellerHome";
import AboutUsSection from '../../components/AbouUsSection/AboutUsSection'
import ConsultingSection from '../../components/ConsultingSection/ConsultingSection'
import TestimonialSection from '../../components/TestimonialSection/TestimonialSection'
import GlobalOffer from "../../components/GlobalOffer/GlobalOffer";
import { useGlobalOfferStore } from "../../Store";
import axios from "axios";
import { useEffect } from "react";
import { Helmet } from 'react-helmet-async';
function Home() {
  const { offer, setOffer } = useGlobalOfferStore();
  useEffect(() => {
      async function getOffers() {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_ENDPOINT}globalOffer/activeOffer`
          );
          if (response.data[0]) {
              setOffer(response.data[0]);
          }
        } catch (error) {
          console.log(error);
        }
      }
      getOffers();
    }, []);
  return (
    <>
<<<<<<< HEAD
    {offer && <GlobalOffer offer={offer}/>}
=======
      <Helmet>
        <title>Equilibre - home</title>
        <meta name="decription" content="" />
      </Helmet>
>>>>>>> anwar_searchbar
      <HeroSection />
      <TopSellerHome />
      <AboutUsSection />
      <ConsultingSection />
      <TestimonialSection />
    </>
  );
}

export default Home;
