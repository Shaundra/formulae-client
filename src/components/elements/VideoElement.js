import React, { Component, Fragment, useState, useEffect } from 'react';
import { YTAPILoaded } from '../../constants';
import NoteForm from '../NoteForm'
import Note from '../Note'
import { API_ROOT } from '../../constants'
import { fetchJWT } from '../../helpers'
import EditElementForm from '../forms/EditElementForm'
import Modal from '../Modal'

const VideoElement = (props) => {
  const [player, setPlayer] = useState()
  const [showForm, setShowForm] = useState({ showEditForm: false, showNoteForm: false })
  const [allNotes, setAllNotes] = useState(props.elmt.notes)
  const videoParams = '?modestbranding=1&enablejsapi=1'

  useEffect(() => {
    let tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
    let firstScript = document.getElementsByTagName('script')[0];
        firstScript.parentNode.insertBefore(tag, firstScript);
  }, [player])

  if (!player) {
    YTAPILoaded.then(YT => {
    setPlayer(new YT.Player('the-frame', {}))

    console.log('in apiloaded', player)
  })}

  const renderForm = () => {
    if (showForm.showNoteForm) {
      return (
        <NoteForm
          parentID={props.elmt.id}
          contentType={props.elmt.content_type}
          hideForm={handleFormClick}
          allNotes={allNotes}
          addNote={setAllNotes}
          player={player}
        />
      )
    } else if (showForm.showEditForm) {
      return (
        <Modal
          compToRender={
            <EditElementForm
              elmt={props.elmt}
              hideForm={handleFormClick}
              handleElementState={handleElementState}
            />
          }
          ariaLabelledBy='edit-element-form'
        />
      )
    }
  }

  const handleFormClick = (ev) => {
    const formToShow = ev.target ? ev.target.name : ev
    const newDisplayStatus = !showForm[formToShow]
    setShowForm({...showForm, [formToShow]: newDisplayStatus})
  }

  const buildPatchBody = (ev) => {
    const reqBody = {
      source_url: ev.target.sourceURL ? ev.target.sourceURL.value : null,
      content: ev.target.textContent ? ev.target.textContent.value : null,
      title: ev.target.title ? ev.target.title.value : null,
      isPublic: ev.target.isPublic.value
    }

    for (let input in reqBody) {
      if (!reqBody[input]) { delete reqBody[input] }
    }

    return reqBody
  }

  const deleteResponse = (jsonResponse, elmtID) => {
    if (jsonResponse.status === 200) {
      const elmtSet = props.allElements.filter(elmt => elmt.id !== elmtID)
      props.setAllElements(elmtSet)
    }
  }

  const patchResponse = (jsonResponse, elmtID) => {
    const elmtSet = props.allElements.map(elmt => elmt.id === elmtID ? jsonResponse : elmt)
    props.setAllElements(elmtSet)
  }

const handleElementState = (ev) => {
    // pass this function to the Edit Form rendered onClick of EDIT
    const elmtID = props.elmt.id
    const url = `${API_ROOT}/elements/${elmtID}`

    const buttonType = ev.target.name
    const method = buttonType === 'delete' ? 'DELETE' : 'PATCH'

    const reqBody = method === 'PATCH' ? buildPatchBody(ev) : {}
    const jwt = JSON.parse(localStorage.getItem('user')).userToken

    fetchJWT({url, method, reqBody, jwt})
      .then(response => response.json())
      .then(json => {
        console.log('this is the json resposne', json, json.status)
        if (method === 'DELETE') {
          deleteResponse(json, elmtID)
        } else {
          patchResponse(json, elmtID)
        }
      })
  }

  return (
    <Fragment>
      <div className='element-box'>
        <button
          name='showEditForm'
          className='fas fa-pencil-alt'
          onClick={handleFormClick}
        >
          {/* Edit Element */}
        </button>

        <h3>{props.elmt.title}</h3>
        <div className='iframe-box'>
          <iframe
            // className='video-iframe'
            id='the-frame'
            src={props.elmt.source_url + videoParams}
            // src='https://player.vimeo.com/video/151715092'
            frameBorder='0'
            style={{border: 'solid 4px #37474F'}}
            allow='encrypted-media'
            allowFullScreen
            title='video'
          ></iframe>
        </div>
        {renderForm()}
        {!showForm.showNoteForm &&
          <button name='showNoteForm' className='add-note-btn' onClick={handleFormClick}>Add Note</button>
        }

        {allNotes.length > 0 &&
          <div className='note-box'>
            <h4>Notes</h4>

            {allNotes.map( note => (
              <Note key={note.id} player={player} note={note} allNotes={allNotes} setAllNotes={setAllNotes} />
            ))}
          </div>
        }
      </div>
    </Fragment>
  )
}

export default VideoElement;
