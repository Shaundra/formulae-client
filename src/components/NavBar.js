import React, { Component, Fragment, useState, useEffect } from 'react';
import { API_ROOT, HEADERS } from '../constants';
// import { BrowserRouter as Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';

import { formatDate, fetchJWT, formatVidTime } from '../helpers'

const NavBar = (props) => {
  const [isVisible, setIsVisible] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const handleClick = (ev) => {
    switch (ev.target.name) {
      case 'browse':
        props.history.push('/browse')
        break
      case 'search':
        props.history.push('/search')
        break
      case 'addFormula':
        // close navbar, open FormulaForm as Modal (write a func, put it in the return)
        // setShowForm(!showForm)
        break
      case 'allFormulae':
        props.history.push('/formulae')
        break
    }

    setIsVisible(!isVisible)
  }

  const openNav = () => {
    setIsVisible(!isVisible)
  }

  // const renderFormulaForm = () => {
  //   if (showForm) {
  //     return (
  //       <Modal
  //         compToRender={
  //           <FormulaForm
  //             // parentID={props.elmt.id}
  //             // contentType={props.elmt.content_type}
  //             hideForm={handleFormClick}
  //             allFormulae={allFormulae}
  //             addFormula={setAllFormulae}
  //           />
  //         }
  //       />
  //     )
  //   }
  // }

  return (
    <Fragment>
      <button onClick={openNav}>Open Menu</button>
      {isVisible &&
      <div className='side-nav'>
        <button id='close-menu' onClick={openNav}>X</button>
        <h3>APP NAME / LOGO</h3>
        <button className='nav-btn' onClick={handleClick} name='browse'>BROWSE</button>
        <button className='nav-btn' onClick={handleClick} name='search'>SEARCH</button>
        <button className='nav-btn' onClick={handleClick} name='addFormula'>CREATE FORMULA</button>
        <button className='nav-btn' onClick={handleClick} name='allFormulae'>VIEW FORMULAE</button>
        {/* <button className='nav-btn' onClick={handleClick}>ELEMENTS</button> */}
      </div>
    }
    </Fragment>
  )
}

export default withRouter(NavBar)
