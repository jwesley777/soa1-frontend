import React from 'react'
import {Field, reduxForm, reset} from 'redux-form'
import '../../css/app.css';
import '../../css/filter.css';

const afterSubmit = (result, dispatch) =>
    dispatch(reset('type-filter-form'));

const validateRadioGroupIsNotEmpty = values => {
    let errors = {};
    if (!values.compare) {
        errors.compare = 'Required';
    }
    return errors;
};

const TypeFilterForm = (props) => {
    const {handleSubmit, submitting} = props
    return (
        <form onSubmit={handleSubmit}>
            <h3>Select tickets with type</h3>
            <div className="radio-group">
                <label><Field name="compare" component="input" type="radio" value="VIP"/>Vip</label>
                <label><Field name="compare" component="input" type="radio" value="USUAL"/>Usual</label>
                <label><Field name="compare" component="input" type="radio" value="BUDGETARY"/>Budgetary</label>
                <label><Field name="compare" component="input" type="radio" value="CHEAP"/>Cheap</label>
            </div>
            <div>
                <button id="ok-but" disabled={submitting}>OK</button>
            </div>
        </form>
    )
}

export default reduxForm({
    form: 'type-filter-form',
    onSubmitSuccess: afterSubmit,
    validate: validateRadioGroupIsNotEmpty
})(TypeFilterForm)