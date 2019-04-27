import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Element from './components/Element'

function App() {
  return (
    <Fragment>
      <Element />
    </Fragment>
  );
}

export default App;
