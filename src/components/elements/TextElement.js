import React, { Component, Fragment, useState, useEffect } from 'react';
import NoteForm from '../NoteForm'
import Note from '../Note'
import { API_ROOT } from '../../constants'
import { fetchJWT } from '../../helpers'

const TextElement = (props) => {
  const [showForm, setShowForm] = useState(false)
  const [allNotes, setAllNotes] = useState(props.elmt.notes)

  // define useEffect function for loading Notes

  const renderForm = () => {
    if (showForm) {
      return (
        <NoteForm
          parentID={props.elmt.id}
          contentType={props.elmt.content_type}
          hideForm={handleFormClick}
          allNotes={allNotes}
          addNote={setAllNotes}
        />
      )
    }
  }

  const handleFormClick = () => {
    setShowForm(!showForm)
  }

  const handleElementState = (ev) => {
    // pass this function to the Edit Form rendered onClick of EDIT
    const elmtID = props.elmt.id
    const url = `${API_ROOT}/elements/${elmtID}`

    const buttonType = ev.target.name
    const method = buttonType === 'delete' ? 'DELETE' : 'PATCH'

    const reqBody = {}
    const jwt = JSON.parse(localStorage.getItem('user')).userToken

    fetchJWT({url, method, reqBody, jwt})
      .then(response => response.json())
      .then(json => {
        console.log('this is the json resposne', json, json.status)
        if (json.status === 200) {
          const elmtSet = props.allElements.filter(elmt => elmt.id !== elmtID)
          props.setAllElements(elmtSet)
        }
      })
  }

  return (
    <div className='element-box'>
      <button name='edit' onClick={() => console.log('Editing Element')}>Edit Element</button>
      <button name='delete' onClick={handleElementState}>Delete Element</button>
      <h3>{props.elmt.title}</h3>
      <p>{props.elmt.content}</p>
      {/* iterate through notes for this element (from api) and render a Note for each */}
      {renderForm()}
      {!showForm &&
        <button onClick={handleFormClick}>Add Note</button>
      }
      <div className='note-box'>
        {/* {props.elmt.notes.map( note => ( */}
        {allNotes.map( note => (
          <Note key={note.id} note={note} allNotes={allNotes} setAllNotes={setAllNotes}/>
        ))}
      </div>
    </div>
  )
}

export default TextElement
