import React, { Component, Fragment, useState, useEffect } from 'react';
import VideoElement from './elements/VideoElement'
import TextElement from './elements/TextElement'
import ImageElement from './elements/ImageElement'


const Formula = (props) => {
  return (
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
  )
}

export default Formula
