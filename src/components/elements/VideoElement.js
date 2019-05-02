import React, { Component, Fragment, useState, useEffect } from 'react';
import { YTAPILoaded } from '../../constants';
import NoteForm from '../NoteForm'
import Note from '../Note'
import { API_ROOT } from '../../constants'
import { fetchJWT } from '../../helpers'

const VideoElement = (props) => {
  const [player, setPlayer] = useState()
  const [showForm, setShowForm] = useState(false)
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
    if (showForm) {
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
    <Fragment>
      <div className='element-box'>
        <button name='edit' onClick={() => console.log('Editing Element')}>Edit Element</button>
        <button name='delete' onClick={handleElementState}>Delete Element</button>
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
        {!showForm &&
          <button onClick={handleFormClick}>Add Note</button>
        }
        {/* if showForm, showForm and hide Add Note button */}
        {/* iterate through notes for this element (from api) and render a Note for each */}
        <div className='note-box'>
          {/* {props.elmt.notes.map( note => ( */}
          {allNotes.map( note => (
            <Note key={note.id} note={note} allNotes={allNotes} setAllNotes={setAllNotes} player={player} />
          ))}
        </div>
      </div>
    </Fragment>
  )
}

export default VideoElement;
