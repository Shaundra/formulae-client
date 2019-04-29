import React, { Fragment } from 'react';
import { API_ROOT, HEADERS } from '../constants';
import Formula from '../components/Formula'

const FormulaePage = (props) => {
  const viewFormula = (history, id) => {
    console.log('toggling state', history)
    history.push(`/formula/${id}`)
  }

  return (
    // iterate through all the formulas
    <Fragment>
      {props.formulae.map(formula => {
        return (
          <div key={formula.id} className='formula-card'>
            <h4>Formula: {formula.title}</h4>
            <p>This is a description of my formula. Words words more words.</p>
            <button
              onClick={() => viewFormula(props.testHistory, formula.id)}
            >
              View
            </button>
          </div>
        )
      })}
  </Fragment>
)
}

export default FormulaePage;
