import React, { Component, Fragment, useState, useEffect } from 'react';
import { API_ROOT, HEADERS, YTAPILoaded } from '../constants';

// let player;
// class Element extends Component {
const Element = () => {

  const [showLink, setShowLink] = useState(false)
  const [player, setPlayer] = useState()

  useEffect(() => {
    let tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
    let firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }, [player])


  if (!player) {YTAPILoaded.then(YT => {
    // new YT.Player('the-frame', {})
    // player = new YT.Player('the-frame', {})
    setPlayer(new YT.Player('the-frame', {}))

    console.log('in apiloaded', player)

  })}

  let handleClick = () => {
    console.log('link', player)
    player.seekTo(65)
  }

  let condShow = () => {
    if (showLink) {
      // return <p>Hello</p>
      return (
        <Fragment>
          <a
            href='#!'
            onClick={() => player.seekTo(60)}
          >
            1:05
          </a>
          <span>This is my annotation</span>
        </Fragment>
      )
    }
  }

  let seekToOne = () => {
    // player.seekTo(60)
    setShowLink(!showLink)
  }
  // let onYouTubeIframeAPIReady = () => {
  //   player = new YT.Player('the-frame', {})
  // }
  // render() {
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
        {condShow()}
        <button onClick={seekToOne}>Seek to One</button>
      </div>
    )
  // }
}

export default Element;

// https://www.youtube.com/watch?v=mxK8b99iJTg
