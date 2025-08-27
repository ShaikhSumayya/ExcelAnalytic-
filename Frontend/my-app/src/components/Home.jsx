import React from 'react'
import Navbar from '../pages/Navbar'
import HeroSection from '../pages/Hero'
import InfoSection from '../pages/InfoSection'
import ReadyInfo from '../pages/ReadyInfo'
import ContactSection from '../pages/ContactSection'
import Footer from '../pages/Footer'
import HowItWorks from '../pages/HowItWorks'
// import '../../public/style.css'

const Home = () => {
  return (
    <>
    <Navbar/>
    <HeroSection/>
    <InfoSection/>
    <ReadyInfo/>
    <HowItWorks/>
    {/* <ContactSection/> */}
    <Footer/>
    </>
  )
}

export default Home