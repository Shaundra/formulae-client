import React, { Component, Fragment, useState, useEffect } from 'react';
import { API_ROOT, HEADERS, AUTH_HEADERS } from '../constants';

const FormulaForm = (props) => {
  const postFormData = (body) => {
    fetch(`${API_ROOT}/formulas`, {
      method: 'POST',
      headers: AUTH_HEADERS,
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then((newFormula) => {
        props.hideForm()
        props.addFormula([newFormula, ...props.allFormulae])
        console.log(newFormula)
      })
  }

  const submitForm = (ev) => {
    ev.preventDefault()
    ev.persist()

    // need userId from somewhere
    const body = {
      title: ev.target.title.value,
      description: ev.target.description.value,
      is_public: ev.target.isPublic.value,
    }

    console.log(body)

    postFormData(body)
  }

  return (
    <form name='formula-form' onSubmit={submitForm}>
      <label htmlFor='title'>Title:</label>
      <input type='text' placeholder='Formula Title' name='title' required />

      <label htmlFor='description'>Description</label>
      <input type='text' placeholder='Formula Description' name='description' required />

      <p>Make this Formula public:</p>
      <label htmlFor='yes-isPublic'>Yes</label>
      <input type='radio' name='isPublic' value='true' id='yes-isPublic' />

      <label htmlFor='no-isPublic'>No</label>
      <input type='radio' name='isPublic' id='no-isPublic' value='false' />

      <input type='submit' value='Create' />
      {/* style this button to be an x, or rename 'Discard' */}
      <button onClick={props.hideForm}>Close</button>
    </form>
  )
}
//
export default FormulaForm
