import React, { Component, Fragment, useState, useEffect } from 'react';
import { API_ROOT, HEADERS } from '../constants';

const FormulaForm = (props) => {
  const postFormData = (body) => {
    fetch(`${API_ROOT}/formulas`, {
      method: 'POST',
      headers: HEADERS,
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
    <form onSubmit={submitForm}>
      <label>Title:
        <input type='text' placeholder='Formula Title' name='title'/>
      </label>

      <label>Description
        <input type='text' placeholder='Formula Description' name='description' />
      </label>

      <p>Make this Formula public:</p>
      <label>Yes
        <input type='radio' name='isPublic' value='true' />
      </label>

      <label>No
        <input type='radio' name='isPublic' value='false' />
      </label>

      <input type='submit' value='Create' />
      {/* style this button to be an x, or rename 'Discard' */}
      <button onClick={props.hideForm}>Close</button>
    </form>
  )
}
//
export default FormulaForm
