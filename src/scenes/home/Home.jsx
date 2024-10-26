import React from 'react'
import MainCarousel from './MainCarousel'
import ShoppigList from './ShoppigList'
import Subscribe from './Subscribe'

const Home = () => {
  return (
    <div className='home'>
      <MainCarousel/>
      <ShoppigList/>
      <Subscribe/>
    </div>
  )
}

export default Home