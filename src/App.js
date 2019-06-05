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
import { UserProvider, useUser } from './helpers/hooks'


const App = () => {
  // const [userData, setUserData] = useState([])
  // const [isLoggedIn, setIsLoggedIn] = useState(false)
  // const { user } = useUser()
  //
  // const [formulaData, setFormulaData] = useState([])

  return (
    <Fragment>
      <UserProvider>
        <Router>
          <Route
            exact path='/home'
            render={(props) => {
              // if (isLoggedIn) {
              //   return (
              //     <Redirect to='/formulae'/>
              //   )
              // } else {
                return (
                  <HomePage
                    // setLogin={setIsLoggedIn}
                    // isLoggedIn={isLoggedIn}
                    browseHistory={props.history}
                    // setUser={setUserData}
                    // userData={userData}
                    // setFormulae={setFormulaData}
                  />
                )
              // }
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
          {/* {isLoggedIn && <NavBar />} */}
          <Route
            exact path='/formulaform'
            render={(props) => (
              <FormulaForm
              />
            )}
          />
          <div className='main'>
            {/* <Switch> */}
          <Route
            exact path='/formulae'
            render={(props) => (
              <FormulaePage
                // formulae={formulaData}
                // formulae={formulaData.formulas}
                // isLoggedIn={isLoggedIn}
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
      </UserProvider>
    </Fragment>
  );
}

export default App;
