import React, { Component, Fragment, useState, useEffect } from 'react';
import { API_ROOT, HEADERS, AUTH_HEADERS } from '../constants';

// a NoteForm needs to be told its parent's (sub)type -- Formula or (Video, Text, Img, Site) Element. via props or state?

const NoteForm = (props) => {
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

  const postFormData = (body) => {
    fetch(`${API_ROOT}/notes`, {
      method: 'POST',
      headers: AUTH_HEADERS,
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then((newNote) => {
        props.hideForm('showNoteForm')
        props.addNote([newNote, ...props.allNotes])
        console.log(newNote)
      })
  }

  const submitForm = (ev) => {
    ev.preventDefault()
    ev.persist()
    console.log('event from submitForm', ev)

    // console.log(ev, ev.target.noteContent.value, props.contentType, props.parentID, (ev.target.timePosition.value || ''))

    const seekToTime = ev.target.timePosition ? ev.target.timePosition.value : null

    const body = {
      content: ev.target.noteContent.value,
      seek_to_time: seekToTime,
      notable_type: props.contentType,
      notable_id: props.parentID
    }

    console.log(body)

    postFormData(body)
  }

  // make form inputs controlled
  // let handleChange = (ev) => {
  //   setTimeFormVal(ev.target.value)
  // }

  return (
    <form onSubmit={submitForm}>
      {/* only render this button if NoteForm on video Element and TimeInput not visible */}
      {props.contentType === 'video'
        && !showTime
        && <button onClick={handleTimeButton}>Add Seek-to Time</button>
      }
      {renderTimeInput()}
      <label>
        Note:
        <textarea name='noteContent' />
      </label>
      <input type='submit' value='Save' />
      {/* style this button to be an x, or rename 'Discard' */}
      <button name='showNoteForm' onClick={props.hideForm}>Close</button>
    </form>
  )
}
//
export default NoteForm
