import React, { Component, Fragment, useState, useEffect } from 'react';
import NoteForm from '../NoteForm'
import Note from '../Note'

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

  return (
    <div className='element-box'>
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
          <Note key={note.id} note={note} />
        ))}
      </div>
    </div>
  )
}

export default TextElement
