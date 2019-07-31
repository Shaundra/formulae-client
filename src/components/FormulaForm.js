import React, { Component, Fragment, useState, useEffect } from 'react';
import { API_ROOT, AUTH_HEADERS } from '../constants';
import { useUser } from '../helpers/hooks'

const FormulaForm = (props) => {
  const { accessToken } = useUser()

  const postFormData = (body) => {
    fetch(`${API_ROOT}/formulas`, {
      method: 'POST',
      headers: AUTH_HEADERS(accessToken),
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
    <Fragment>
      <div className='form-header'>
        Create a New Formula
      </div>
      <form name='formula-form' onSubmit={submitForm}>
        <label htmlFor='title'>Title:</label>
        <input type='text' placeholder='Formula Title' name='title' required />

        <label htmlFor='description'>Description</label>
        <input type='text' placeholder='Formula Description' name='description' required />

        <div className='is-public--sub-form'>
          <p>Make this Formula public:</p>
          <label htmlFor='yes-isPublic'>Yes</label>
          <input type='radio' name='isPublic' value='true' id='yes-isPublic' />

          <label htmlFor='no-isPublic'>No</label>
          <input type='radio' name='isPublic' id='no-isPublic' value='false' />
        </div>
        <input type='submit' value='Create' />

        <button
          onClick={props.hideForm}
          className='form-close-btn'
        >
          <span className="u-hide-visually">Close</span>
          <svg className="c-modal__close-icon" viewBox="0 0 40 40"><path d="M 10,10 L 30,30 M 30,10 L 10,30"></path></svg>
        </button>
      </form>
    </Fragment>
  )
}
//
export default FormulaForm
