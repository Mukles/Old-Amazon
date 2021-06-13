import React from 'react';
import Header from './Header';
import './Navbar.css';
import NavBar from './Navbar';
import Slider from './Slider';
import Banner from './Banner';
import FalahSell from './FlashSell';


const Home = () =>{
  return(
    <section id='home'>
      <Header />
      <NavBar />
      <Slider />
      <Banner />
      <FalahSell />
    </section>
  )
}

export default Home;