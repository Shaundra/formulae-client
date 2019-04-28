import React, { Component, Fragment, useState, useEffect } from 'react';
import { API_ROOT, HEADERS } from '../constants';

// a Note needs to be told its parent's (sub)type -- Formula or (Video, Text, Img, Site) Element. via props or state?

const Note = (props) => {
  // if (props.elementType === 'video') && props.note.seekToTime then render seekToTime
  // what will a Note obj returned from api look like?

// handle clicking on timestamp, need player passed down from Element
// let handleClick = (player, seekToTime) => {
//   console.log('link', player)
//   player.seekTo(65)
// }


  //   <Fragment>
  //     <a
  //       href='#!'
  //       onClick={() => handleClick(timeFormVal)}
  //     >
  //       `${timeFormVal}`
  //     </a>
  //     <span>This is my annotation</span>
  //   </Fragment>

  return (
    // <div className='note-box' id={props.note.notable_id}>
    //   <p>{props.note.content}</p>
    //   <p>{props.note.updated_at}</p>
    // </div>
    <p></p>
  )
}

export default Note
// t.string "notable_type"
// t.bigint "notable_id"
// t.bigint "user_id"
// t.text "content"
// t.datetime "created_at", null: false
// t.datetime "updated_at", null: false
// add seekToTime column
