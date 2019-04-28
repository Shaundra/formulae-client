import React, { Fragment, useState, useEffect } from 'react';
import VideoElement from './elements/VideoElement'
import TextElement from './elements/TextElement'
import ImageElement from './elements/ImageElement'


const Formula = (props) => {
  const renderElements = () => {
    props.elements.map( elmt => {
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
    })
  }

  return (
    <div className='formula-box'>
      <div className='formula-head'>
        <h2>{props.formula.title}</h2>
      </div>
      {props.elements.map( elmt => {
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
  )
}

export default Formula
