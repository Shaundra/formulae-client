import React, { Fragment, useState, useEffect } from 'react';
import { API_ROOT, HEADERS } from '../constants';

// post registration form to api
// save token (returned from api) to localStorage
// redirect to all formulas

const SignupForm = () => {
  const postFormData = (body) => {
    fetch(`${API_ROOT}/users`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then((newUser) => {
        localStorage.setItem('userToken', newUser.jwt)
        // returns a user object, shape at bottom of file
        // maybe set a userData state?
        // if successful, redirect to /formulae
      })
  }

  const handleFormSubmit = (ev) => {
    ev.preventDefault()

    const body = {
      email: ev.target.email.value,
      name: ev.target.name.value,
      password: ev.target.password.value,
    }

    console.log(body)
  }

  return (
    <h2>Register</h2>
    <form onSubmit={handleFormSubmit}>
      <label>Email:
        <input type='text' placeholder='Email' name='email'/>
      </label>

      <label>Username:
        <input type='text' placeholder='Username' name='name'/>
      </label>

      <label>Password:
        <input type='password' placeholder='Create Password' name='password' />
      </label>
      {/* Add Password Confirmation Field */}
      <input type='submit' value='Continue' />
    </form>
  )
}

export default SignupForm;

// user: {
//   jwt: 'token',
//   user: {
//     formulas: [],
//     id: 17,
//     name: "my new user",
//     tags: [],
//   }
// }
