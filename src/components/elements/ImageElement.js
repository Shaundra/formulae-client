import React, { Component, Fragment, useState, useEffect } from 'react';
import NoteForm from '../NoteForm'

const ImageElement = (props) => {
  const [showForm, setShowForm] = useState(false)

  // define useEffect function for loading Notes

  const renderForm = () => {
    if (showForm) {
      return (
        <NoteForm parentID={props.elmt.id} contentType={props.elmt.content_type}/>
      )
    }
  }

  const handleFormClick = () => {
    setShowForm(!showForm)
  }

  return (
    <div className='element-box'>
      <h3>{props.elmt.title}</h3>
      <img src={props.elmt.source_url} /> {/* add alt attribute */}
      {/* iterate through notes for this element (from api) and render a Note for each */}
      {renderForm()}
      {!showForm &&
        <button onClick={handleFormClick}>Add Note</button>
      }
    </div>
  )
}

export default ImageElement
