import React, { Component, Fragment, useState, useEffect } from 'react';
import { API_ROOT, HEADERS, YTAPILoaded } from '../constants';

// class Element extends Component {
const Element = () => {

  const [showForm, setShowForm] = useState(false)
  const [player, setPlayer] = useState()
  const [timeFormVal, setTimeFormVal] = useState('')
  const [showNote, setShowNote] = useState(false)

  useEffect(() => {
    let tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
    let firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }, [player])

  if (!player) {YTAPILoaded.then(YT => {
    setPlayer(new YT.Player('the-frame', {}))

    console.log('in apiloaded', player)
  })}

  let handleClick = (seekToTime) => {
    console.log('link', player)
    player.seekTo(65)
  }

  let handleFormSubmit = (ev) => {
    ev.preventDefault();
    // ev.persist()
    console.log('after submit', timeFormVal)
    setShowNote(true)
    // return (
    //   <Fragment>
    //     <a
    //       href='#!'
    //       onClick={() => handleClick(timeFormVal)}
    //     >
    //       `${timeFormVal}`
    //     </a>
    //     <span>This is my annotation</span>
    //   </Fragment>
    // )
  }

  let renderNote = () => {
    if (showNote) {
      return (
        <Fragment>
          <a
            href='#!'
            onClick={() => handleClick(timeFormVal)}
          >
            {timeFormVal}
          </a>
          <span>This is my annotation</span>
        </Fragment>
      )

    }
  }

  let handleChange = (ev) => {
    setTimeFormVal(ev.target.value)
  }

  let renderForm = () => {
    if (showForm) {
      return (
        <Fragment>
          <form  onSubmit={handleFormSubmit}>
            <label>
              Timestamp for Note:
              <input
                type="text"
                name="timePosition"
                placeholder="mm:ss"
                value={timeFormVal}
                onChange={handleChange}
              />
            </label>
              <input type="submit" value="Add Note" />
          </form>
        </Fragment>
      )
    }
  }


  let handleFormClick = () => {
    // player.seekTo(60)
    setShowForm(!showForm)
  }

  return (
    <div
      className='video-container'
    >
      <iframe
        // className='video-iframe'
        id='the-frame'
        src='https://www.youtube.com/embed/mxK8b99iJTg?modestbranding=1&enablejsapi=1'
        // src='https://player.vimeo.com/video/151715092'
        frameBorder='0'
        style={{border: 'solid 4px #37474F'}}
        allow='encrypted-media'
        allowFullScreen
        title='video'
      ></iframe>
      <p>This is my lil tag.</p>
      {renderForm()}
      {renderNote()}
      <button onClick={handleFormClick}>Add TimeStamp Note</button>
    </div>
  )
}

export default Element;

// https://www.youtube.com/watch?v=mxK8b99iJTg
