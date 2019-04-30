import React, { Fragment, useState, useEffect } from 'react';
import VideoElement from './elements/VideoElement'
import TextElement from './elements/TextElement'
import ImageElement from './elements/ImageElement'
import Note from './Note'
import NoteForm from './NoteForm'


const Formula = (props) => {
  const [showForm, setShowForm] = useState(false)

  const handleFormClick = () => {
    setShowForm(!showForm)
  }

  const renderForm = () => {
    if (showForm) {
      return (
        <NoteForm
          parentID={props.formula.id}
          contentType='Formula'
          hideForm={handleFormClick}
        />
      )
    }
  }

  return (
    <div className='formula-box'>
      <div className='formula-head'>
        <h2>{props.formula.title}</h2>
        {/* Add formula notes here */}
        {props.formula.notes.map( note => (
          <Note key={note.id} note={note}/>
        ))}
        {/* Add addNote form here */}
        {renderForm()}
        {!showForm &&
          <button onClick={handleFormClick}>Add Note</button>
        }
      </div>
      <div className='elements'>
        {props.formula.elements.map( elmt => {
          switch (elmt.content_type) {
            case 'video':
              return <VideoElement key={elmt.id} elmt={elmt}/>
              break
            case 'text':
              return <TextElement key={elmt.id} elmt={elmt}/>
              break
            case 'image':
              return <ImageElement key={elmt.id} elmt={elmt}/>
              break
          }
        })}
      </div>
    </div>
  )
}

export default Formula
