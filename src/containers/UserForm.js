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

  const closeForm = () => {
    props.setFormState({
      showForm: false,
      formType: ''
    })
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

        <button name='showElementForm' onClick={closeForm} className='form-close-btn'>
          <span className="u-hide-visually">Close</span>
          <svg className="c-modal__close-icon" viewBox="0 0 40 40"><path d="M 10,10 L 30,30 M 30,10 L 10,30"></path></svg>
        </button>
      </form>
    </Fragment>
  }
/>
  )
}

export default UserForm;
