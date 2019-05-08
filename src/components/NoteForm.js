import React, { Component, Fragment, useState, useEffect } from 'react';
import { API_ROOT, HEADERS, AUTH_HEADERS } from '../constants';
import { convertToSeconds } from '../helpers'
// import FormValidator from 'validate-js'

// a NoteForm needs to be told its parent's (sub)type -- Formula or (Video, Text, Img, Site) Element. via props or state?

const NoteForm = (props) => {
  const [showTime, setShowTime] = useState(false)

  // const fieldsToValidate = [
  //   {
  //     name: 'noteContent',
  //     display: 'Note Content',
  //     rules: 'required'
  //   },
  //   {
  //     name: 'timePosition',
  //     display: 'Video Timestamp',
  //     rules: 'callback_check_format',
  //     // depends: (field) => field.length > 0
  //   }
  // ]
  //
  // const validationCallback = (errors) => {
  //
  // }
  //
  // const validator = new FormValidator('note-form', fieldsToValidate)
  //
  // validator.registerCallback('check_format', (value) => {
  //   const pattern = /^((\d?\d:)?[0-5])?\d:[0-5]\d$/
  //
  //   return pattern.test(value)
  // })
  //   .setMessage('check_format', 'Use the hh:mm:ss format for timestamps!')

  const handleTimeButton = () => {
    setShowTime(!showTime)
    // Does the above need to be setShowTime(showTime => !showTime)?
  }

  const renderTimeInput = () => {
    if (showTime) {
      return (
        <Fragment>
          <label>
            Timestamp for Note:
            <input
              type="text"
              name="timePosition"
              placeholder="hh:mm:ss"
              pattern='^((\d?\d:)?[0-5])?\d:[0-5]\d$'
              // value={timeFormVal}
              // onChange={handleChange}
            />
          </label>
          <label> Use Video Current Time?
            <input name='currentTime' type='checkbox'/>
          </label>
        </Fragment>
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

  const getSeekToTime = (ev) => {
    if (ev.target.currentTime && ev.target.currentTime.checked) {
      return Math.floor(props.player.getCurrentTime())
    } else if (ev.target.timePosition) {
      return convertToSeconds(ev.target.timePosition.value)
    } else {
      return null
    }
  }

  const submitForm = (ev) => {
    ev.preventDefault()

    const seekToTime = getSeekToTime(ev)

    const body = {
      content: ev.target.noteContent.value,
      seek_to_time: seekToTime,
      notable_type: props.contentType,
      notable_id: props.parentID
    }
    // console.log(body)
    postFormData(body)
  }

  // make form inputs controlled
  // let handleChange = (ev) => {
  //   setTimeFormVal(ev.target.value)
  // }

  return (
    <form name='note-form' onSubmit={submitForm}>
      {/* only render this button if NoteForm on video Element and TimeInput not visible */}
      {props.contentType === 'video'
        && !showTime
        && <button onClick={handleTimeButton}>Add Seek-to Time</button>
      }
      {renderTimeInput()}
      <label htmlFor='noteContent'>Note:</label>
      <textarea name='noteContent' required />
      <input type='submit' value='Save' />
      {/* style this button to be an x, or rename 'Discard' */}
      <button name='showNoteForm' onClick={props.hideForm}>Close</button>
    </form>
  )
}
//
export default NoteForm
