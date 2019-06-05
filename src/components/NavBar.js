import React, { Component, Fragment, useState, useEffect } from 'react';
import { API_ROOT, HEADERS } from '../constants';
// import { BrowserRouter as Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { useUser } from '../helpers/hooks'


const NavBar = (props) => {
  const { setAccessToken } = useUser()
  const [isVisible, setIsVisible] = useState({
    showNav: true,
    prevScrollPos: window.pageYOffset,
    navTransparent: true
  })

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    // return cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isVisible.prevScrollPos])


  const [showForm, setShowForm] = useState(false)

  const handleClick = (ev) => {
    switch (ev.target.name) {
      case 'home':
      case 'home-logo':
        props.history.push('/home')
        break
      case 'search':
        props.history.push('/search')
        break
      case 'addFormula':
        break
      case 'allFormulae':
        props.history.push('/formulae')
        break
      case 'log-out':
        setAccessToken('')
        break
    }

  }

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset
    const nowVisible = isVisible.prevScrollPos > currentScrollPos
    const navTransparent = currentScrollPos === 0

    setIsVisible({
      showNav: nowVisible,
      prevScrollPos: currentScrollPos,
      navTransparent
    })
  }

  return (
    <Fragment>
      <div className='side-nav'>
        <button className='nav-btn' onClick={handleClick} name='home'>
          Home
        </button>
        <button className='nav-btn' onClick={handleClick} name='log-out'>
          Log-out
        </button>
        {/* <button className='nav-btn' onClick={handleClick}>ELEMENTS</button> */}
      </div>
      {isVisible.showNav &&
        <div className='top-nav'>
          <button
            className={`top-nav--btn top-nav--centered ${isVisible.navTransparent ? 'top-nav--transparent' : null}`}
            onClick={handleClick}
            name='home-logo'
          >Formula(e)
          </button>
          {props.location.pathname === '/formulae' &&
            <button
              className={`top-nav--btn top-nav--right ${isVisible.navTransparent ? 'top-nav--transparent' : null}`}
              onClick={handleClick}
              name='home-logo'
            >Create a Formula
            </button>
          }
          {RegExp(/^\/formula\//).test(props.location.pathname) &&
            <button
              className={`top-nav--btn top-nav--right ${isVisible.navTransparent ? 'top-nav--transparent' : null}`}
              onClick={handleClick}
              name='home-logo'
            >Add an Element
            </button>
          }
        {/* <button
          className='nav-btn'
          onClick={handleClick}
          name='allFormulae'
        >VIEW FORMULAE
        </button> */}
          {/* <button className='nav-btn' onClick={handleClick} name='browse'>BROWSE</button> */}
          {/* <button className='nav-btn' onClick={handleClick} name='search'>SEARCH</button> */}
        </div>
      }
    </Fragment>
  )
}


// const NavBar = (props) => {
//   const [isVisible, setIsVisible] = useState(false)
//   const [showForm, setShowForm] = useState(false)
//
//   const handleClick = (ev) => {
//     switch (ev.target.name) {
//       case 'browse':
//         props.history.push('/browse')
//         break
//       case 'search':
//         props.history.push('/search')
//         break
//       case 'addFormula':
//         // close navbar, open FormulaForm as Modal (write a func, put it in the return)
//         // setShowForm(!showForm)
//         break
//       case 'allFormulae':
//         props.history.push('/formulae')
//         break
//     }
//
//     setIsVisible(!isVisible)
//   }
//
//   const openNav = () => {
//     setIsVisible(!isVisible)
//   }
//
//   // const renderFormulaForm = () => {
//   //   if (showForm) {
//   //     return (
//   //       <Modal
//   //         compToRender={
//   //           <FormulaForm
//   //             // parentID={props.elmt.id}
//   //             // contentType={props.elmt.content_type}
//   //             hideForm={handleFormClick}
//   //             allFormulae={allFormulae}
//   //             addFormula={setAllFormulae}
//   //           />
//   //         }
//   //       />
//   //     )
//   //   }
//   // }
//
//   return (
//     <Fragment>
//       <button onClick={openNav}>Open Menu</button>
//       {isVisible &&
//       <div className='side-nav'>
//         <button id='close-menu' onClick={openNav}>X</button>
//         <h3>APP NAME / LOGO</h3>
//         <button className='nav-btn' onClick={handleClick} name='browse'>BROWSE</button>
//         <button className='nav-btn' onClick={handleClick} name='search'>SEARCH</button>
//         <button className='nav-btn' onClick={handleClick} name='addFormula'>CREATE FORMULA</button>
//         <button className='nav-btn' onClick={handleClick} name='allFormulae'>VIEW FORMULAE</button>
//         {/* <button className='nav-btn' onClick={handleClick}>ELEMENTS</button> */}
//       </div>
//     }
//     </Fragment>
//   )
// }

export default withRouter(NavBar)
