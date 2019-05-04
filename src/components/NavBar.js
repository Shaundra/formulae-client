import React, { Component, Fragment, useState, useEffect } from 'react';
import { API_ROOT, HEADERS } from '../constants';
import { formatDate, fetchJWT, formatVidTime } from '../helpers'

const NavBar = (props) => {
  const [isVisible, setIsVisible] = useState(false)

  const handleClick = (ev) => {
    console.log('clicked on')
  }
  const openNav = () => {
    setIsVisible(!isVisible)
  }

  return (
    <Fragment>
      <button onClick={openNav}>Open Menu</button>
      {isVisible &&
      <div className='side-nav'>
        <button id='close-menu' onClick={openNav}>X</button>
        <h3>APP NAME / LOGO</h3>
        <button className='nav-btn' onClick={handleClick}>BROWSE</button>
        <button className='nav-btn' onClick={handleClick}>SEARCH</button>
        <button className='nav-btn' onClick={handleClick}>CREATE FORMULA</button>
        <button className='nav-btn' onClick={handleClick}>VIEW FORMULAE</button>
        {/* <button className='nav-btn' onClick={handleClick}>ELEMENTS</button> */}
      </div>
    }
    </Fragment>
  )
}

export default NavBar
