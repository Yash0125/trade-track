import React from 'react';
import './Header.css'

const Header = () => {
  return (
    <div className='header-container'>
      <h1 className='header-title'>TradeTrack</h1>
      <ul className='header-link-container'>
        <li className='header-link'>Home</li>
        <li className='header-link'>Wishlist</li>
      </ul>
    </div>
  )
}

export default Header
