import React, { Fragment, useState, useEffect } from 'react';
import { API_ROOT, HEADERS } from '../constants';
import Modal from '../components/Modal'

const UserForm = (props) => {

  const postFormData = (body, formRoute) => {
    fetch(`${API_ROOT}/${formRoute}`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then((user) => {
        const userData = JSON.stringify({'userToken': user.jwt, user})
        localStorage.setItem('user', userData)
        props.setLogin(true)
        props.setUser(user)

        console.log(user, 'inside fetch', props.userData, 'a', user.user.formulas)

        props.setFormulae(user.user.formulas)
        props.browseHistory.push('/formulae')
        // returns a user object, shape at bottom of file
        // maybe set a userData state?
        // if successful, redirect to /formulae
      })
  }

  const handleFormSubmit = (ev) => {
    ev.preventDefault()

    const email = ev.target.email ? ev.target.email.value : null

    const body = {
      email,
      name: ev.target.name.value,
      password: ev.target.password.value,
    }

    console.log(body)

    postFormData(body, props.formRoute)
  }

// add email column to User
  return (
    <Modal
      compToRender={
    <Fragment>
      {/* if loggedIn <Redirect /> */}
      <h2>{props.formRoute === 'login' ? 'Log-in' : 'Sign-up'}</h2>

      <form className='user-form' onSubmit={handleFormSubmit}>
        {props.formRoute === 'login'
        ?
        null :
        <Fragment>
          <label htmlFor='email'>Email:</label>
          <input type='text' placeholder='Email' name='email'/>
        </Fragment>
        }

        <label htmlFor='name'>Username:</label>
        <input type='text' placeholder='Username' name='name'/>

        <label htmlFor='password'>Password:</label>
        <input type='text' placeholder='Create Password' name='password' />
        {/* Add Password Confirmation Field */}
        <input type='submit' value='Continue' />
      </form>
    </Fragment>
  }
/>
  )
}

export default UserForm;
