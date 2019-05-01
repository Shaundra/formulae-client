import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import UserForm from './UserForm'

const HomePage = (props) => {
  const [formState, setFormState] = useState({showForm: false, formType: ''})

  const displayForm = (formType) => {
    const formRoute = formType === 'signUp' ? 'users' : 'login'
    if (formState.showForm) {
      return (
        <UserForm
          formRoute={formRoute}
          setUser={props.setUser}
          userData={props.userData}
          setFormulae={props.setFormulae}
          setLogin={props.setLogin}
          browseHistory={props.browseHistory}
          formState={formState}

        />
      )
    }
  }

  const handleClick = (ev) => {
    // const formType =
    // setShowForm(!showForm)
    console.log(ev.target.name)

    setFormState({
      // showForm: !formState,
      showForm: true,
      formType: ev.target.name
    })
  }

  const handleRedirect = () => {
    if (props.isLoggedIn) {
      return <Redirect to='/formulae' />
    }
  }

  return (
    // Sign-up OR Log-in
    // if logged-in Redirect to /formulae
    <Fragment>
      {handleRedirect()}
      {displayForm(formState.formType)}
      <button onClick={handleClick} name='signUp'>Sign-up</button>
      <button
        onClick={handleClick}
        name='logIn'
        formState={formState} //jst for visibility
      >Log-in
    </button>
    </Fragment>
  )
}

export default HomePage
