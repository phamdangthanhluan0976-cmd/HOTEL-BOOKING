import React from 'react'
import Hero from '../components/Hero'
import FeaturedDestination from '../components/FeaturedDestination'
import ExclusiveOffers from '../components/ExclusiveOffers'
import Testimonial from '../components/Testimonial'
import NewLetter from '../components/NewLetter'


const Home = () => {
    return (
        <div>
            <Hero />
            <FeaturedDestination />
            <ExclusiveOffers />
            <Testimonial />
            <NewLetter />

        </div>
    )
}

export default Home
