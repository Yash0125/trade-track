import React from 'react';
import './Header.css';
import {Link } from "react-router-dom"

const Header = () => {
  return (
    <div className='header-container'>
      <h1 className='header-title'><Link to="/">TradeTrack</Link></h1>
      <ul className='header-link-container'>
        <li className='header-link'><Link to="/">Home</Link></li>
        <li className='header-link'><Link to="/wishlist">Wishlist</Link></li>
      </ul>
    </div>
  )
}

export default Header
