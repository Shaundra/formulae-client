import React, { Fragment, useState, useEffect } from 'react';
import VideoElement from './elements/VideoElement'
import TextElement from './elements/TextElement'
import ImageElement from './elements/ImageElement'
import Note from './Note'
import NoteForm from './NoteForm'
import ElementForm from './forms/ElementForm'


const Formula = (props) => {
  // const [showForm, setShowForm] = useState(false)
  const [showForm, setShowForm] = useState({ showElementForm: false, showNoteForm: false })
  const [allNotes, setAllNotes] = useState(props.formula.notes)
  const [allElements, setAllElements] = useState(props.formula.elements)

  const handleFormClick = (ev) => {
    const formToShow = ev.target ? ev.target.name : ev
    const newDisplayStatus = !showForm[formToShow]
    setShowForm({...showForm, [formToShow]: newDisplayStatus})

    // if (ev.target) {
    //   // ev.persist()
    //   // console.log('event from hideForm', ev)
    //   const formToShow = ev.target.name
    //   const newDisplayStatus = !showForm[formToShow]
    //   setShowForm({...showForm, [formToShow]: newDisplayStatus})
    // } else {
    //   const newDisplayStatus = !showForm[ev]
    //   setShowForm({...showForm, [formToShow]: newDisplayStatus})
    // }
    // setShowForm(!showForm)
  }

  // const renderForm = () => {
  //   if (showForm) {
  //     return (
  //       <NoteForm
  //         parentID={props.formula.id}
  //         contentType='Formula'
  //         hideForm={handleFormClick}
  //         allNotes={allNotes}
  //         addNote={setAllNotes}
  //       />
  //     )
  //   }
  // }

  const renderForm = () => {
    if (showForm.showNoteForm) {
      return (
        <NoteForm
          parentID={props.formula.id}
          contentType='Formula'
          hideForm={handleFormClick}
          allNotes={allNotes}
          addNote={setAllNotes}
        />
      )
    } else if (showForm.showElementForm) {
      return (
        <ElementForm
          parentID={props.formula.id}
          hideForm={handleFormClick}
          allElements={allElements}
          addElement={setAllElements}
        />
      )
    }
  }

  return (
    <div className='formula-box'>
      <div className='formula-head'>
        <h2>{props.formula.title}</h2>
        {/* Add formula notes here */}
        {/* {props.formula.notes.map( note => ( */}
        {allNotes.map( note => (
          <Note key={note.id} note={note} allNotes={allNotes} setAllNotes={setAllNotes} />
        ))}
        {/* Add addNote form here */}
        {renderForm()}
        {!showForm.showNoteForm &&
          <button name='showNoteForm' onClick={handleFormClick}>Add Note</button>
        }
      </div>
      {!showForm.showElementForm &&
        <button name='showElementForm' onClick={handleFormClick}>Add Element</button>
      }
      <div className='elements'>
        {allElements.map( elmt => {
        {/* {props.formula.elements.map( elmt => { */}
          switch (elmt.content_type) {
            case 'video':
              return <VideoElement
                key={elmt.id}
                elmt={elmt}
                allElements={allElements}
                setAllElements={setAllElements}
              />
              break
            case 'text':
              return <TextElement
                key={elmt.id}
                elmt={elmt}
                allElements={allElements}
                setAllElements={setAllElements}
              />
              break
            case 'image':
              return <ImageElement
                key={elmt.id}
                elmt={elmt}
                allElements={allElements}
                setAllElements={setAllElements}
              />
              break
          }
        })}
      </div>
    </div>
  )
}

export default Formula
