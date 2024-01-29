import HeroSection from "../../components/HeroSection/HeroSection";
import TopSellerHome from "../../components/TopSellerHome/TopSellerHome";
import AboutUsSection from '../../components/AbouUsSection/AboutUsSection'
import ConsultingSection from '../../components/ConsultingSection/ConsultingSection'
import TestimonialSection from '../../components/TestimonialSection/TestimonialSection'
import { Helmet } from 'react-helmet-async';
function Home() {
  return (
    <>
      <Helmet>
        <title>Equilibre - home</title>
        <meta name="decription" content="" />
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
