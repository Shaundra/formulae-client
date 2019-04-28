import React, { Component, Fragment, useState, useEffect } from 'react';
import { YTAPILoaded } from '../../constants';
// import Note from './Note'
import Form from '../Form'

const VideoElement = (props) => {

  const [player, setPlayer] = useState()
  const [showForm, setShowForm] = useState(false)
  const videoParams = '?modestbranding=1&enablejsapi=1'

  useEffect(() => {
    let tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
    let firstScript = document.getElementsByTagName('script')[0];
        firstScript.parentNode.insertBefore(tag, firstScript);
  }, [player])

  if (!player) {YTAPILoaded.then(YT => {
    setPlayer(new YT.Player('the-frame', {}))

    console.log('in apiloaded', player)
  })}

  let renderForm = () => {
    if (showForm) {
      return (
        <Form myprop='this string' contentType={props.elmt.content_type} />
      )
    }
  }

  let handleFormClick = () => {
    setShowForm(!showForm)
  }

  return (
    <Fragment>
      <div className='element-box'>
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
    </div>
    </Fragment>
  )
}

export default VideoElement;
