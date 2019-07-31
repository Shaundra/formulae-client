import React, { Fragment, useState, useEffect } from 'react';
import VideoElement from './elements/VideoElement'
import TextElement from './elements/TextElement'
import ImageElement from './elements/ImageElement'
import WebsiteElement from './elements/WebsiteElement'
import Note from './Note'
import NoteForm from './NoteForm'
import ElementForm from './forms/ElementForm'
import Modal from './Modal'
import { useUser } from '../helpers/hooks'

const Formula = (props) => {
  const { user, accessToken } = useUser()
  const formulaData = user.formulas.find(formula => formula.id === parseInt(props.match.params.id))

  const [allNotes, setAllNotes] = useState(formulaData.notes)
  const [allElements, setAllElements] = useState(formulaData.elements)
  const [showForm, setShowForm] = useState({ showElementForm: false, showNoteForm: false })

  const handleFormClick = (ev) => {
    const formToShow = ev.target ? ev.target.name : ev
    const newDisplayStatus = !showForm[formToShow]
    setShowForm({...showForm, [formToShow]: newDisplayStatus})
  }

  const renderForm = () => {
    if (showForm.showNoteForm) {
      return (
        <NoteForm
          parentID={formulaData.id}
          contentType='Formula'
          hideForm={handleFormClick}
          allNotes={allNotes}
          addNote={setAllNotes}
        />
      )
    } else if (showForm.showElementForm) {
      return (
        <Modal
          compToRender={        <ElementForm
                  parentID={formulaData.id}
                  hideForm={handleFormClick}
                  allElements={allElements}
                  addElement={setAllElements}
                  id='element-form'
                />}
          closeFunc={handleFormClick}
          ariaLabelledBy='element-form'
        />
      )
    }
  }

  return (
    <div className='formula-box'>
      <div className='formula-head'>
        <h2>{formulaData.title}</h2>
        <p>{formulaData.description}</p>
        {/* Add formula notes here */}
        {allNotes.length > 0 &&
          <div className='note-box'>
            <h4>Notes</h4>

            {allNotes.map( note => (
              <Note key={note.id} note={note} allNotes={allNotes} setAllNotes={setAllNotes} />
            ))}
          </div>
        }

        {renderForm()}
        {!showForm.showNoteForm &&
          <button name='showNoteForm' className='add-note-btn' onClick={handleFormClick}>Add Note</button>
        }
      </div>

      <div className='gradient'></div>

      {!showForm.showElementForm &&
        <button name='showElementForm' id='show-element-form' onClick={handleFormClick}>Add Element</button>
      }
      <div className='elements'>
        {allElements.map( elmt => {
          switch (elmt.content_type) {
            case 'video':
              return <VideoElement
                key={elmt.id}
                elmt={elmt}
                allElements={allElements}
                setAllElements={setAllElements}
                jwt={accessToken}
              />
              break
            case 'text':
              return <TextElement
                key={elmt.id}
                elmt={elmt}
                allElements={allElements}
                setAllElements={setAllElements}
                jwt={accessToken}
              />
              break
            case 'image':
              return <ImageElement
                key={elmt.id}
                elmt={elmt}
                allElements={allElements}
                setAllElements={setAllElements}
                jwt={accessToken}
              />
              break
            case 'website':
              return <WebsiteElement
                key={elmt.id}
                elmt={elmt}
                allElements={allElements}
                setAllElements={setAllElements}
                jwt={accessToken}
              />
          }
        })}
      </div>
    </div>
  )
}

export default Formula
