import React, { Fragment, useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import FormulaePage from './containers/FormulaePage'
import Formula from './components/Formula'
import VideoElement from './components/elements/VideoElement'
import TextElement from './components/elements/TextElement'
import { API_ROOT, HEADERS } from './constants';
import FormulaForm from './components/FormulaForm'
import UserForm from './containers/UserForm'
import HomePage from './containers/HomePage'
import NavBar from './components/NavBar'


const App = () => {
  // switch useState to useReducer
  // const [formulaData, setFormulaData] = useState({formulas: []})
  const [userData, setUserData] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [formulaData, setFormulaData] = useState([])

  // try this w useEffect / hooks
  // grabbing data from login instead now
  // useEffect( () => {
  //   // update to fetch current user
  //   // const userId = userData.user.id ? userData.user.id : null
  //   fetch(API_ROOT + '/users/1', {
  //   // fetch(API_ROOT + `/users/${userId}`, {
  //     method: 'GET',
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem('userToken')}`
  //     }
  //   })
  //     .then(response => response.json())
  //     .then(json => {
  //       // console.log(json)
  //       // console.log(json.formulas[0])
  //       setFormulaData(json.formulas)
  //       // setFormulaData(json)
  //     })
  // }, [userData])

  // const defFormulaRoutes = () => {
  //   formulaData.formulas.map(formula => (
  //     <Route
  //       exact path={`/formula/${formula.id}`}
  //       render={(props) => (
  //         <Formula formula={formula}/>
  //       )}
  //     />
  //   ))
  // }

  const getData = () => {
    if (isLoggedIn) {
      fetch(API_ROOT + '/users/1', {
        // fetch(API_ROOT + `/users/${userId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`
        }
      })
      .then(response => response.json())
      .then(json => {
        // console.log(json)
        // console.log(json.formulas[0])
        setFormulaData(json.formulas)
        // setFormulaData(json)
      })
    }
  }
// history={history}
  return (
    <Fragment>
      {/* {console.log('in render', formulaData)} */}
      <Router>
        <Route
          exact path='/home'
          render={(props) => {
            if (isLoggedIn) {
              return (
                <Redirect to='/formulae'/>
              )
            } else {
              return (
                <HomePage
                  setLogin={setIsLoggedIn}
                  isLoggedIn={isLoggedIn}
                  browseHistory={props.history}
                  setUser={setUserData}
                  userData={userData}
                  setFormulae={setFormulaData}
                />
              )
            }
          }}
        />
        {/* <Route
          exact path='/login'
          render={(props) => (
            <UserForm
              formRoute='login'
              setUser={setUserData}
              userData={userData}
              setFormulae={setFormulaData}
              setLogin={setIsLoggedIn}
              browseHistory={props.history}
            />
          )}
        /> */}
        {/* <Route
          exact path='/'
          render={(props) => (
            <UserForm
              formRoute='users'
              setUser={setUserData}
              userData={userData}
              setFormulae={setFormulaData}
              setLogin={setIsLoggedIn}
              browseHistory={props.history}
            />
          )}
        /> */}
        {isLoggedIn && <NavBar />}
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
              formulae={formulaData}
              // formulae={formulaData.formulas}
              browseHistory={props.history}
            />
          )}
        />
        {/* figure out why using this function doesn't give me any data*/}
        {/* {defFormulaRoutes()} */}
        {isLoggedIn && formulaData.map(formula => (
          <Route
            exact path={`/formula/${formula.id}`}
            key={formula.id}
            render={(props) => (
              <Formula formula={formula} />
            )}
          />
        ))}
        <Route exact path='/browse' />
        <Route exact path='/search' />
        <Route exact path='/elements' />
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
