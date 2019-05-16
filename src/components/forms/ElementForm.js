import React, { Component, Fragment, useState, useEffect } from 'react';
import { API_ROOT, AUTH_HEADERS } from '../../constants';

const ElementForm = (props) => {
  const [elementType, setElementType] = useState('')

  const handleTypeSelect = (ev) => {
    setElementType(ev.target.value)
  }

  const showSubForm = () => {
    if (elementType === 'Image' || elementType === 'Video' || elementType === 'Website') {
      return (
        <Fragment>
          <label htmlFor='title'>Title:</label>
          <input type='text' name='title' placeholder='Element Title'/>
          <label htmlFor='sourceURL'>Source URL:</label>
          <input type='url' name='sourceURL' placeholder='Source URL' required />
        </Fragment>
      )
    } else if (elementType === 'Text') {
      return (
        <Fragment>
          <label htmlFor='title'>Title:</label>
          <input type='text' name='title' placeholder='Element Title' />
          <label htmlFor='textContent'>Text Content:</label>
          <textarea name='textContent' required />
      </Fragment>
      )
    }
  }

  const postFormData = (body) => {
    fetch(`${API_ROOT}/elements`, {
      method: 'POST',
      headers: AUTH_HEADERS(),
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then((newElement) => {
        props.hideForm('showElementForm')
        props.addElement([newElement, ...props.allElements])
        console.log(newElement)
      })
  }

  const submitForm = (ev) => {
    ev.preventDefault()
    ev.persist()
    console.log(ev)
    const source_url = ev.target.sourceURL ? ev.target.sourceURL.value : null
    const content = ev.target.textContent ? ev.target.textContent.value : null

    const body = {
      content_type: ev.target.contentType.value.toLowerCase(),
      title: ev.target.title.value,
      is_public: ev.target.isPublic.value,
      source_url,
      content,
      formula_id: props.parentID
    }

    console.log(body)
    postFormData(body)
  }
  const onkey = (ev) => {
    ev.persist()
    console.log(ev, ev.target, ev.type)
  }

  return (
    <Fragment>
      <div className='form-header'>
        Add a New Element
      </div>
      <form name='showElementForm' onSubmit={submitForm}>
        <label htmlFor='contentType'>Content Type:</label>
        <select name='contentType' onChange={handleTypeSelect} required>
          <option hidden disabled selected value=''></option>
          <option value='Video'>Video</option>
          <option value='Image'>Image</option>
          <option value='Text'>Text</option>
          <option value='Website'>Website</option>
        </select>

        {showSubForm()}
        <div className='is-public--sub-form'>
          <p>Make this Formula public?</p>
          <label htmlFor='yes-isPublic'>Yes</label>
          <input type='radio' name='isPublic' value='true' id='yes-isPublic' />

          <label htmlFor='no-isPublic'>No</label>
          <input type='radio' name='isPublic' id='no-isPublic' value='false' />
        </div>
        <input type='submit' value='Create' />

        <button name='showElementForm' onClick={props.hideForm} className='form-close-btn'>
          <span className="u-hide-visually">Close</span>
          <svg className="c-modal__close-icon" viewBox="0 0 40 40"><path d="M 10,10 L 30,30 M 30,10 L 10,30"></path></svg>
        </button>
      </form>
    </Fragment>
  )
}

export default ElementForm
