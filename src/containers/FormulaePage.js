import React, { Fragment, useState, useEffect } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { API_ROOT, HEADERS } from '../constants';
import Formula from '../components/Formula'
import FormulaForm from '../components/FormulaForm'
import Modal from '../components/Modal'
import { useUser } from '../helpers/hooks'

const FormulaePage = (props) => {
  const { user } = useUser()
  const [allFormulae, setAllFormulae] = useState(user.formulas)

  const [showForm, setShowForm] = useState(false)

  const handleFormClick = () => {
    setShowForm(!showForm)
  }

  const renderForm = () => {
    if (showForm) {
      return (
        <Modal
          compToRender={
            <FormulaForm
              // parentID={props.elmt.id}
              // contentType={props.elmt.content_type}
              hideForm={handleFormClick}
              allFormulae={allFormulae}
              addFormula={setAllFormulae}
            />
          }
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
      {renderForm()}
      {!showForm &&
        <button onClick={handleFormClick}>Create New Formula</button>
      }
      <h4 className='formulae-count'><strong>{allFormulae.length}</strong> formulae</h4>

      {allFormulae.map(formula => {
        return (
            <div key={formula.id} className='formula-card'>
              {/* <button
                className='formula-card--link'
                onClick={() => viewFormula(props.browseHistory, formula.id)}
              >
                <h4>{formula.title}</h4>
                <p>{formula.description}</p>
              </button> */}
              <Link
                to={`/formulae/${formula.id}`}
                className='formula-card--link'
              >
                <h4>{formula.title}</h4>
                <p>{formula.description}</p>
              </Link>
            </div>
        )
      })}
  </Fragment>
)
}

export default FormulaePage;
