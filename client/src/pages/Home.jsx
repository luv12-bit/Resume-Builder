import React from 'react'
import Banner from '../components/home/Banner'
import Hero from '../components/home/Hero'
import Features from '../components/home/Features'
import CallToAction from '../components/home/CallToAction'
import Testimonial from '../components/home/Testimonial'
import My from '../components/home/My'


const Home = () => {
  return (
    <div>
        <Banner />
        <Hero />
        <Features />
        <Testimonial />
        {/* <CallToAction/> */}
        <My />
    </div>
  )
}

export default Home