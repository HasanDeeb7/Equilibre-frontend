import { useEffect } from "react";
import AboutUsSection from "../../components/AbouUsSection/AboutUsSection";
import ConsultingSection from "../../components/ConsultingSection/ConsultingSection";
import HeroSection from "../../components/HeroSection/HeroSection";
import TestimonialSection from "../../components/TestimonialSection/TestimonialSection";
import TopSellerHome from "../../components/TopSellerHome/TopSellerHome";
import { useGlobalOfferStore } from "../../Store";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import GlobalOffer from "../../components/GlobalOffer/GlobalOffer";

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
      {offer && <GlobalOffer offer={offer} />}
      <Helmet>
        <title>Equilibre - home</title>
        <meta name="description" content="" />
      </Helmet>
      <HeroSection />
      <TopSellerHome />
      <AboutUsSection />
      <ConsultingSection />
      <TestimonialSection />
    </>
  );
}

export default Home;
