import React, { Fragment, useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import FormulaePage from './containers/FormulaePage'
import Formula from './components/Formula'
import VideoElement from './components/elements/VideoElement'
import TextElement from './components/elements/TextElement'
import { API_ROOT, HEADERS } from './constants';

// const formulaData = {
//   id: 1,
//   title: "Learning React Hooks",
//   is_public: false,
// }

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
  // switch useState to useReducer
  const [formulaData, setFormulaData] = useState({ formulas: [] })

  // try this w useEffect / hooks
  useEffect( () => {
    fetch(API_ROOT + '/users/1')
      .then(response => response.json())
      .then(json => {
        console.log(json)
        console.log(json.formulas[0])
        setFormulaData(json)
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
      <Router>
        <Route
          exact path='/formulae'
          render={(props) => (
            <FormulaePage
              formulae={formulaData.formulas}
              testHistory={props.history}
            />
          )}
        />
        {/* figure out why using this function doesn't give me any data*/}
        {/* {defFormulaRoutes()} */}
        {formulaData.formulas.map(formula => (
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

// useEffect(async () => {
//     const result = await axios(
//       'http://hn.algolia.com/api/v1/search?query=redux',
//     );
//
//     setData(result.data);
//   }, []);
//
//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await axios(
//         'http://hn.algolia.com/api/v1/search?query=redux',
//       );
//
//       setData(result.data);
//     };
//
//     fetchData();
//   }, []);
