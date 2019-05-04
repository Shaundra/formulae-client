import React, { Component, Fragment, useState, useEffect } from 'react';
import { API_ROOT, HEADERS, AUTH_HEADERS } from '../../constants';

const ElementForm = (props) => {
  const [elementType, setElementType] = useState('')

  const handleTypeSelect = (ev) => {
    setElementType(ev.target.value)
  }

  const showSubForm = () => {
    if (elementType === 'Image' || elementType === 'Video' || elementType === 'Website') {
      return (
        <Fragment>
          <label>Title:
            <input type='text' name='title' placeholder='Element Title'/>
          </label>
          <label>Source URL:
            <input type='url' name='sourceURL' placeholder='Source URL' required />
          </label>
        </Fragment>
      )
    } else if (elementType === 'Text') {
      return (
        <Fragment>
          <label>Title:
            <input type='text' name='title' placeholder='Element Title' />
          </label>
          <label>Text Content:
            <textarea name='textContent' required />
          </label>
      </Fragment>
      )
    }
  }

  const postFormData = (body) => {
    fetch(`${API_ROOT}/elements`, {
      method: 'POST',
      headers: AUTH_HEADERS,
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
      <div>
        I am an Element Form
      </div>
      <form name='showElementForm' onSubmit={submitForm}>
        <label>Content Type:
          <select name='contentType' onChange={handleTypeSelect} required>
            <option hidden disabled selected value=''></option>
            <option value='Video'>Video</option>
            <option value='Image'>Image</option>
            <option value='Text'>Text</option>
            <option value='Website'>Website</option>
          </select>
        </label>
        {showSubForm()}
        <p>Make this Formula public?</p>
        <label>Yes
          <input type='radio' name='isPublic' value='true' />
        </label>

        <label>No
          <input type='radio' name='isPublic' value='false' />
        </label>
        <input type='submit' value='Create' />

        <button name='showElementForm' onClick={props.hideForm}>Close</button>
      </form>
    </Fragment>
  )
}

export default ElementForm
