import React, { Component, Fragment, useState, useEffect } from 'react';
import { API_ROOT, HEADERS } from '../constants';
import { formatDate, fetchJWT, formatVidTime } from '../helpers'

// a Note needs to be told its parent's (sub)type -- Formula or (Video, Text, Img, Site) Element. via props or state?

const Note = (props) => {
  // if (props.elementType === 'video') && props.note.seekToTime then render seekToTime
  // what will a Note obj returned from api look like?

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
        <p>{formatDate(props.note.created_at)}</p>
      </Fragment>
    )
  }

  const renderElementNote = (props) => {
    return (
      <Fragment>
        <p>
          {props.note.seek_to_time
            ?
            <a href='#!' onClick={handleTimeClick}><span>{formatVidTime(props.note.seek_to_time)}</span></a>
            : null
          }
          {props.note.content}
        </p>
        <p>{formatDate(props.note.created_at)}</p>
      </Fragment>
    )
  }
  //   <Fragment>
  //     <a
  //       href='#!'
  //       onClick={() => handleClick(timeFormVal)}
  //     >
  //       `${timeFormVal}`
  //     </a>
  //     <span>This is my annotation</span>
  //   </Fragment>
  const handleElementState = (ev) => {
    const noteID = props.note.id
    const url = `${API_ROOT}/notes/${noteID}`
    const method = 'DELETE'
    const jwt = JSON.parse(localStorage.getItem('user')).userToken

    fetchJWT({url, method, jwt})
      .then(response => response.json())
      .then(json => {
        if (json.status === 200) {
          const noteSet = props.allNotes.filter(note => note.id !== noteID)
          props.setAllNotes(noteSet)
        }
      })
  }

  return (
    // <div className='note-box' id={props.note.notable_id}>
    //   <p>{props.note.content}</p>
    //   <p>{props.note.updated_at}</p>
    // </div>
    <Fragment>
      <button name='delete' onClick={handleElementState}>Delete Note</button>
      {props.note.notable_type === 'Formula' && renderFormulaNote(props)}
      {props.note.notable_type === 'Element' && renderElementNote(props)}
    </Fragment>
  )
}


export default Note
