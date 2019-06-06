import React, { Fragment, useState, useEffect } from 'react';
import UserForm from './UserForm'
import { ReactComponent as HomeImage } from '../sideways-flask.svg'

const HomePage = (props) => {
  const [formState, setFormState] = useState({showForm: false, formType: ''})

  const displayForm = (formType) => {
    const formRoute = formType === 'signUp' ? 'users' : 'login'
    if (formState.showForm) {
      return (
        <UserForm
          formRoute={formRoute}
        />
      )
    }
  }

  const handleClick = (ev) => {
    setFormState({
      showForm: true,
      formType: ev.target.name
    })
  }

  return (
    // Sign-up OR Log-in
    <div className='home-container'>
      {displayForm(formState.formType)}
      <div className='home-btn-container'>
        <button onClick={handleClick} name='signUp' className='homepage-btn'>
          Sign Up
        </button>
        <button onClick={handleClick} name='logIn' className='homepage-btn'>
          Log In
        </button>
      </div>
      <div className='logo'>
        <HomeImage />
        <h2>Formula(e)</h2>
      </div>
    </div>
  )
}

export default HomePage
