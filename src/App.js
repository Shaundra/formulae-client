import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Formula from './components/Formula'
import VideoElement from './components/elements/VideoElement'
import TextElement from './components/elements/TextElement'

const formulaData = {
  id: 1,
  title: "Learning React Hooks",
  is_public: false,
}

const formulaOneElements = [
  {
  id: 1,
  title: "Intro to React Hooks",
  position: 0,
  is_public: null,
  source_url: "https://www.youtube.com/embed/mxK8b99iJTg",
  location_path: null,
  content_type: "video",
  content: null
  },
  {
  id: 2,
  title: "What are Hooks?",
  position: 1,
  is_public: null,
  source_url: "https://pbs.twimg.com/media/DyubqDoWwAAyanN.jpg",
  location_path: null,
  content_type: "image",
  content: null
  },
  {
  id: 3,
  title: "Rules of Hooks",
  position: 2,
  is_public: null,
  source_url: null,
  location_path: null,
  content_type: "text",
  content: "Two Rules of Hooks: Only Call Hooks at the Top Level, Only Call Hooks from React Functions"
}]

const App = () => {
  return (
    <Fragment>
      <Formula formula={formulaData} elements={formulaOneElements}/>
    </Fragment>
  );
}

export default App;
