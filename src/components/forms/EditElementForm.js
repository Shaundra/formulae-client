import React, { Component, Fragment, useState, useEffect } from 'react';

const EditElementForm = (props) => {
  const showSubForm = () => {
    // add subform for editing websiteElement metadata
    if (props.elmt.content_type === 'text') {
      return (
        <Fragment>
          <label htmlFor='textContent'>Text Content:</label>
          <textarea name='textContent' placeholder={props.elmt.content} />
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <label htmlFor='sourceURL'>Source URL:</label>
          <input type='url' name='sourceURL' placeholder={props.elmt.source_url} />
        </Fragment>
      )
    }
  }

  const submitForm = (ev) => {
    ev.preventDefault()
      // add some HTML5 validation to this form, require at least one field to be completed
    props.handleElementState(ev)
    props.hideForm(ev)
  }

  const deleteElmt = (ev) => {
    props.handleElementState(ev)
    props.hideForm(ev)
  }

  return (
    <Fragment>
      <div className='form-header'>
        Editing Element...
      </div>

      <form name='showEditForm' onSubmit={submitForm}>
        <label htmlFor='title'>Title:</label>
        <input type='text' name='title' placeholder={props.elmt.title}/>

        {showSubForm()}
        <div className='is-public--sub-form'>
          <p>Make this Formula public?</p>
          <label htmlFor='yes-isPublic'>Yes</label>
          <input type='radio' name='isPublic' value='true' id='yes-isPublic' />

          <label htmlFor='no-isPublic'>No</label>
          <input type='radio' name='isPublic' id='no-isPublic' value='false' />
        </div>
        <input type='submit' value='Update' />

        <button name='showEditForm' onClick={props.hideForm} className='form-close-btn'>
          <span className="u-hide-visually">Close</span>
          <svg className="c-modal__close-icon" viewBox="0 0 40 40">
            <path d="M 10,10 L 30,30 M 30,10 L 10,30"></path>
          </svg>
        </button>
      </form>
      <button name='delete' onClick={deleteElmt} className='delete-btn'>Delete Element</button>
    </Fragment>
  )
}

export default EditElementForm;
