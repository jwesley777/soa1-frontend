import React, {useEffect} from 'react'
import {Field, reduxForm} from 'redux-form'
import '../../css/app.css';
import '../../css/edit-form.css';
import {useDispatch, useSelector} from "react-redux";
import {renderedInputField} from "../customFormComponents/rendetedInputField";
import {colors} from "../../constants/enumConstants";
import {getLocations} from "../../actions/locationsActions";

const CreatePersonForm = (props) => {
    const {handleSubmit, pristine, reset, submitting, id} = props
    const dispatch = useDispatch();
    const locationList = useSelector(state => state.location.locationsList)

    useEffect(() => {
        dispatch(getLocations());
    }, []);

    useEffect(() => {
        props.reset();
        props.initialize({
            locations: locationList[0].id,
            eyeColor: colors[0]
        });
    }, [locationList])

    return (
        <form onSubmit={handleSubmit} id={"ticket-form"}>
            <div className={"ticket-form"}>
                <h3>Person</h3>
                <div className="label">Location name</div>
                <Field name="locations" id="locations"
                       component="select" label="Coordinates">
                    {locationList.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
                </Field>
                <Field name="height" type="number"
                       component={renderedInputField} label="Height (kilo)"
                    /*validate={[required]}*/
                />
                <div className="label">Eye color</div>
                <Field name="eyeColor"
                       component="select" label="Eye color">
                    {colors.map(o => <option key={o} value={o}>{o} </option>)}
                </Field>
                <div>
                    <button id="edit-form-but" disabled={submitting}>Submit</button>
                </div>
            </div>

        </form>
    )
}

export default reduxForm({
    form: 'create-person-form',
})(CreatePersonForm)