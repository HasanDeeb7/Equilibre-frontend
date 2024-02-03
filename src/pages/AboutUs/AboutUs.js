import React from "react";
import logo from "../../assets/svgComponent/photo-1575936123452-b67c3203c357.avif";
// import AboutUsParag from '../../components/AboutUs/AboutUsParag'
// import AboutUsComponent from '../../components/AboutUs/AboutUs'
import imageABoutUs from "../../assets/download (1).jpeg";
import Style from "./AboutUs.module.css";
import { Helmet } from "react-helmet-async";
import { lazy } from "react";
import { Suspense } from "react";

const AboutUsComponent = lazy(() => import("../../components/AboutUs/AboutUs"));
const AboutUsParag = lazy(() =>
  import("../../components/AboutUs/AboutUsParag")
);

function AboutUs() {
  return (
    <>
      <Helmet>
        <title>Equilibre - About us</title>
        <meta name="decription" content="information about us" />
      </Helmet>
      <AboutUsComponent
        title="Welcome at equilibre!"
        parag="Hello and thank you for visiting Equilibre.
      I'm Kawthar Alawa, the founder, and I'm thrilled to have you here.
      Equilibre is more than a store; it's a space dedicated to your well-being journey.
      I'm passionate about helping you achieve balance and vitality through nutrition and lifestyle.
      Explore personalized nutrition guidance, discover nourishing products in our store, and find 
      inspiration for your wellness journey.
      Thank you for choosing Equilibre. Let's embark on this journey together!"
        image={logo}
      />
      <AboutUsParag
        title="Our values "
        parag_a="We aim to build a community that shares in the joys
      and challenges of pursuing a healthier lifestyle.
      Together, we create a supportive network that celebrates individual
      successes and fosters a sense of belonging."
        parag_b="Transparency and honesty are at the core of our practice.
      We uphold the highest standards of integrity in all
      aspects of our work, from product selection to personalized guidance."
        parag_c=" We are committed to providing personalized
      solutions that cater to individual needs and preferences,
      recognizing that one size does not fit all."
      />

      <Suspense fallback={<div>Loading</div>}>
        <AboutUsComponent
          title="Who I am ?"
          parag="Hello, I'm Kawthar Alawa, founder of Equilibre. Thank you for joining us.
        My passion for nutrition stems from a personal journey. Growing up, I witnessed the transformative power of a healthy lifestyle. Equilibre is a reflection of that journey—a space to discover personalized nutrition and wholesome products.
        Let's embark on your wellness journey together.
        "
          image={logo}
          isReverse={true}
        />

        <AboutUsComponent
          title="Many Blocks and Components"
          parag="Startup Framework contains components and complex blocks which can easily be integrated into almost any design. "
          image={logo}
        />
      </Suspense>
    </>
  );
}

export default AboutUs;
