import React, { Fragment, useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import FormulaePage from './containers/FormulaePage'
import Formula from './components/Formula'
import VideoElement from './components/elements/VideoElement'
import TextElement from './components/elements/TextElement'
import { API_ROOT, HEADERS } from './constants';
import FormulaForm from './components/FormulaForm'

// const formulaData = {
//   id: 1,
//   title: "Learning React Hooks",
//   is_public: false,
// }

const App = () => {
  // switch useState to useReducer
  const [formulaData, setFormulaData] = useState([])
  // const [formulaData, setFormulaData] = useState({formulas: []})

  // try this w useEffect / hooks
  useEffect( () => {
    // update to fetch current user
    fetch(API_ROOT + '/users/1')
      .then(response => response.json())
      .then(json => {
        // console.log(json)
        // console.log(json.formulas[0])
        setFormulaData(json.formulas)
        // setFormulaData(json)
      })
  }, [])

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

  return (
    <Fragment>
      {console.log('in render', formulaData)}
      <Router>
        <Route
          exact path='/formulaform'
          render={(props) => (
            <FormulaForm
            />
          )}
        />
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
        {/* {formulaData.formulas.map(formula => ( */}
        {formulaData.map(formula => (
          <Route
            exact path={`/formula/${formula.id}`}
            key={formula.id}
            render={(props) => (
              <Formula formula={formula} />
            )}
          />
        ))}
        <Route exact path='/browse' />
      </Router>
    </Fragment>
  );
}

export default App;
