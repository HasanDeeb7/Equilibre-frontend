import HeroSection from "../../components/HeroSection/HeroSection";
import { useGlobalOfferStore } from "../../Store";
import axios from "axios";
import { lazy, Suspense, useEffect } from "react";
import { Helmet } from "react-helmet-async";

const TopSellerHome = lazy(() =>
  import("../../components/TopSellerHome/TopSellerHome")
);
const ConsultingSection = lazy(() =>
  import("../../components/ConsultingSection/ConsultingSection")
);
const TestimonialSection = lazy(() =>
  import("../../components/TestimonialSection/TestimonialSection")
);
const GlobalOffer = lazy(() =>
  import("../../components/GlobalOffer/GlobalOffer")
);
const AboutUsSection = lazy(() =>
  import("../../components/AbouUsSection/AboutUsSection")
);

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
      <Suspense fallback={<div>Loading...</div>}>
        <TopSellerHome />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <AboutUsSection />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <ConsultingSection />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <TestimonialSection />
      </Suspense>
    </>
  );
}

export default Home;
