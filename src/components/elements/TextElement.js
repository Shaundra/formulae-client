import React, { Component, Fragment, useState, useEffect } from 'react';
import Form from '../Form'

const TextElement = (props) => {
  const [showForm, setShowForm] = useState(false)

  // define useEffect function for loading Notes

  const renderForm = () => {
    if (showForm) {
      return (
        <Form myprop='this string' contentType={props.elmt.content_type}/>
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
    </div>
  )
}

export default TextElement
