import React from 'react'
import NavbarMenu from '../../Components/NavbarMenu/NavbarMenu'
import HeroSection from '../../Components/HeroSection/HeroSection'
import TrustedBy from '../../Components/TrustedBy/TrustedBy'
import ProductsGallery from '../../Components/ProductGallery/ProductGallery'
import ProductSpecs from '../../Components/ProductSpecs/ProductSpecs'
import FAQSection from '../../Components/FAQSection/FAQSection'
import Footer from '../../Components/Footer/Footer'


function Home() {
  return (
    <>
        <NavbarMenu/>
        <HeroSection/>
        <TrustedBy/>
        <ProductsGallery/>
        <ProductSpecs/>
        <FAQSection/>
        <Footer/>
    </>
  )
}

export default Home