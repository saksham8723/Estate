import React from 'react'
import Header from '../Components/Header'
import About from '../Components/About'
import Projects from '../Components/Projects'
import Testimonials from '../Components/Testimonials'
import Contact from '../Components/Contact'
import Footer from '../Components/Footer'
import Features from '../Components/Features'
import Stats from '../Components/Stats'
import Newsletter from '../Components/Newsletter'

function Home() {
  return (
    <div className="w-full overflow-hidden">
      <Header />
      <Features />
      <About />
      <Stats />
      <Projects />
      <Testimonials />
      <Newsletter />
      <Contact />
      <Footer />
    </div>
  )
}

export default Home
