import React, { Component, Fragment, useState } from 'react';
import ReactDOM, { createPortal } from 'react-dom';
import ElementForm from './forms/ElementForm';

const ModalContent = (props) => {
  const onkey = (ev) => {
    // ev.persist()
    // console.log(ev, ev.target, ev.type)
  }

  return createPortal(
    <aside
      className='c-modal-cover'
      aria-modal='true'
      tabIndex='-1' // indicates elmt shouldn't ordered in sequential focus navigation, using JS for this
      role='dialog'
      aria-labelledby={props.ariaLabelledBy}
      onKeyDown={onkey}
    >
      <div className='c-modal'>
        {/* <button className="c-modal__close">
          <span className="u-hide-visually">Close</span>
          <svg className="c-modal__close-icon" viewBox="0 0 40 40"><path d="M 10,10 L 30,30 M 30,10 L 10,30"></path></svg>
        </button> */}
        <div className='c-modal__body'>
          {props.compToRender}
        </div>
      </div>
    </aside>, document.body
  )
}

const Modal = (props) => {
  return (
    <Fragment>
      <ModalContent
        compToRender={props.compToRender}
        ariaLabelledBy={props.ariaLabelledBy}
        closeFunc={props.closeFunc}
      />
    </Fragment>
  )
}

export default Modal
