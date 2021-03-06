import React, { Component, Fragment, useState, useEffect } from 'react';
import { API_ROOT, HEADERS } from '../constants';
import { formatDate, fetchJWT, formatVidTime } from '../helpers'
import { useUser } from '../helpers/hooks'

const Note = (props) => {
  const { accessToken } = useUser()
  // handle clicking on timestamp, need player passed down from Element
  const handleTimeClick = () => {
    if (props.player) {
      props.player.seekTo(props.note.seek_to_time)
    }
  }

  const renderFormulaNote = (props) => {
    return (
      <Fragment>
        <p>{props.note.content}</p>
      </Fragment>
    )
  }

  const renderElementNote = (props) => {
    return (
      <Fragment>
          {props.note.seek_to_time
            ?
            <a
              href='#!'
              role='button' tabindex='0'
              onClick={handleTimeClick}
              >
                <span>{formatVidTime(props.note.seek_to_time)}</span>
              </a>
            : null
          }
        <p>
          <pre>{props.note.content}</pre>
        </p>
      </Fragment>
    )
  }

  const handleElementState = (ev) => {
    const noteID = props.note.id
    const url = `${API_ROOT}/notes/${noteID}`
    const method = 'DELETE'

    // const jwt = JSON.parse(localStorage.getItem('user')).userToken

    fetchJWT({url, method, jwt: accessToken})
      .then(response => response.json())
      .then(json => {
        if (json.status === 200) {
          const noteSet = props.allNotes.filter(note => note.id !== noteID)
          props.setAllNotes(noteSet)
        }
      })
  }

  return (
    <div className='notes'>
      {props.note.notable_type === 'Formula' && renderFormulaNote(props)}
      {props.note.notable_type === 'Element' && renderElementNote(props)}
      <div className='notes-footer'>
        <p className='note-time'>{formatDate(props.note.created_at)}</p>
        <button
          name='delete'
          className='far fa-trash-alt'
          onClick={handleElementState}
          title="Delete Note"
        >
          {/* <svg className="c-modal__close-icon" viewBox="0 0 40 40">
            <path d="M 10,10 L 30,30 M 30,10 L 10,30"></path>
          </svg> */}
          {/* <svg className='delete-circle-times' viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill='none' className='delete-circle'/>
            <path
              class="delete-x"
              d="M22 22 78 78 M78 22 22 78"
            />
          </svg> */}
        </button>
      </div>
    </div>
  )
}


export default Note;
