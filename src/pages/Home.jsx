// src/pages/Home.js
import React from 'react';
import Header from '../components/Header';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import PropertyGridSection from '../components/PropertyGridSection';
import TestimonialSlider from '../components/TestimonialSlider'
import InquireForm1 from '../components/InquireForm1';
import CombinedComponent from '../components/HeroSectionSearch';
import FeaturedListing from '../components/FeatureListing';
const Home = () => {
  return (
    <div className="home-page">
      <Header />
      <CombinedComponent/> 
      <PropertyGridSection/>
      <InquireForm1/>
      <FeaturedListing/>
      <TestimonialSlider />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;