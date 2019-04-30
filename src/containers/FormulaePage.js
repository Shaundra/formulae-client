import React, { Fragment, useState, useEffect } from 'react';
import { API_ROOT, HEADERS } from '../constants';
import Formula from '../components/Formula'
import FormulaForm from '../components/FormulaForm'

const FormulaePage = (props) => {
  const [allFormulae, setAllFormulae] = useState(props.formulae)

  // this is rerendering even when props.formulae hasn't changed
  useEffect(() => setAllFormulae(props.formulae), [props.formulae])

  const [showForm, setShowForm] = useState(false)

  const handleFormClick = () => {
    setShowForm(!showForm)
  }

  const renderForm = () => {
    if (showForm) {
      return (
        <FormulaForm
          // parentID={props.elmt.id}
          // contentType={props.elmt.content_type}
          hideForm={handleFormClick}
          allFormulae={allFormulae}
          addFormula={setAllFormulae}
        />
      )
    }
  }

  const viewFormula = (history, id) => {
    console.log('toggling state', history)
    history.push(`/formula/${id}`)
  }

  return (
    // iterate through all the formulas
    <Fragment>
      <div>{console.log('in formulae, props', props.formulae)}</div>
      <div>{console.log('in formulae, state', allFormulae)}</div>
      {renderForm()}
      {!showForm &&
        <button onClick={handleFormClick}>Create New Formula</button>
      }
      {allFormulae.map(formula => {
      {/* {props.formulae.map(formula => { */}
        return (
          <div key={formula.id} className='formula-card'>
            <h4>Formula: {formula.title}</h4>
            <p>Description: {formula.description}</p>
            <button
              onClick={() => viewFormula(props.browseHistory, formula.id)}
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
