import React, { Component, Fragment, useState, useEffect } from 'react';
import { API_ROOT, HEADERS } from '../constants';

// a NoteForm needs to be told its parent's (sub)type -- Formula or (Video, Text, Img, Site) Element. via props or state?

const Form = (props) => {
  const [showTime, setShowTime] = useState(false)

  let handleTimeButton = () => {
    setShowTime(!showTime)
    // Does the above need to be setShowTime(showTime => !showTime)?
  }

  let renderTimeInput = () => {
    if (showTime) {
      return (
        <label>
          Timestamp for Note:
          <input
            type="text"
            name="timePosition"
            placeholder="mm:ss"
            // value={timeFormVal}
            // onChange={handleChange}
          />
        </label>
      )
    }
  }

  let submitForm = (ev) => {
    ev.preventDefault()
    // POST note to API
  }

  // make form inputs controlled
  // let handleChange = (ev) => {
  //   setTimeFormVal(ev.target.value)
  // }

  return (
    <form onSubmit={submitForm}>
      {/* only render this button if Note on video Element and TimeInput not visible */}
      {props.contentType === 'video'
        && !showTime
        && <button onClick={handleTimeButton}>Add Seek-to Time</button>
      }
      {renderTimeInput()}
      <label>
        Note:
        <textarea name='content' />
      </label>
      <input type='submit' value='Save' />
    </form>
  )
}
//
export default Form
