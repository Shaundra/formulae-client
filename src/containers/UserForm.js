import React, { Fragment, useState, useEffect } from 'react';
import { API_ROOT, HEADERS } from '../constants';
import Modal from '../components/Modal'
import { useUser } from '../helpers/hooks'

const UserForm = (props) => {
  const { setAccessToken } = useUser()

  const postFormData = (body, formRoute) => {
    fetch(`${API_ROOT}/${formRoute}`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then((userAPI) => {
        setAccessToken(userAPI.jwt)
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
