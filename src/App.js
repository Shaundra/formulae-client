import React, { Fragment, useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import FormulaePage from './containers/FormulaePage'
import Formula from './components/Formula'
import { API_ROOT, HEADERS } from './constants';
import FormulaForm from './components/FormulaForm'
import HomePage from './containers/HomePage'
import NavBar from './components/NavBar'
import { useUser } from './helpers/hooks'


const App = () => {
  const { user } = useUser()
  return (
    user.name ? <AuthenticatedApp /> : <UnauthenticatedApp />
  );
}

function UnauthenticatedApp () {
  return (
    <HomePage />
  )
}

function AuthenticatedApp () {
  return (
    <Router>
      <NavBar />
      <Route
        exact path='/'
        render={() =>
          <Redirect to='/formulae' />
        }
      />
      <Route
        exact path='/formulaform'
        render={(props) => (
          <FormulaForm
          />
        )}
      />
      <div className='main'>
      <Route
        exact path='/formulae'
        render={(props) => (
          <FormulaePage
            browseHistory={props.history}
          />
        )}
      />
      <Route
        path={'/formulae/:id'}
        component={Formula}
      />

      <Route exact path='/browse' />
      <Route exact path='/search' />
      <Route exact path='/elements' />
      </div>
    </Router>
  )
}

export default App;
