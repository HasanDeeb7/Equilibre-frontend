import HeroSection from "../../components/HeroSection/HeroSection";
import TopSellerHome from "../../components/TopSellerHome/TopSellerHome";
import AboutUsSection from '../../components/AbouUsSection/AboutUsSection'
import ConsultingSection from '../../components/ConsultingSection/ConsultingSection'
import TestimonialSection from '../../components/TestimonialSection/TestimonialSection'
function Home() {
  return (
    <>
      <HeroSection />
      <TopSellerHome />
      <AboutUsSection/>
      <ConsultingSection/>
      <TestimonialSection/>
    </>
  );
}

export default Home;
