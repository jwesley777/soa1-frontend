import React, {useEffect} from 'react'
import {Field, reduxForm} from 'redux-form'
import '../../css/app.css';
import '../../css/edit-form.css';
import {useDispatch, useSelector} from "react-redux";
import {renderedInputField} from "../customFormComponents/rendetedInputField";
import {types} from "../../constants/enumConstants";
import {getCoordinates} from "../../actions/coordinatesActions";
import {getPerson} from "../../actions/personsActions";

const CreateTicketForm = (props) => {
    const {handleSubmit, pristine, reset, submitting, id} = props
    const dispatch = useDispatch();
    const ticketType = useSelector(state => state.tickets.editedTicket.type);
    const coordinatesList = useSelector(state => state.coordinates.coordinatesList);
    const personList = useSelector(state => state.person.personsList);

    useEffect(() => {
        dispatch(getCoordinates());
        dispatch(getPerson());
    }, []);

    useEffect(() => {
        props.reset();
        props.initialize({
            type: types[0],
            coordinates: coordinatesList[0].id,
            person: personList[0].id
        });
    }, [coordinatesList, personList])

    return (
        <form onSubmit={handleSubmit} id={"ticket-form"}>
            <div className={"ticket-form"}>
                <h3>Ticket</h3>
                <Field name="name" type="text"
                       component={renderedInputField} label="Name"
                    /* validate={[required]}*/
                />
                <Field name="discount" type="number"
                       component={renderedInputField} label="Discount"
                    /* validate={[required]}*/
                />
                <Field name="price" type="number"
                       component={renderedInputField} label="Price"
                    /*validate={[required]}*/
                />
                <div className="label">Type</div>
                <Field name="type"
                       component="select" label="Type">
                    {types.map(o => <option key={o} value={o} selected={ticketType === o}>{o} </option>)}
                </Field>
                <div>
                    <button id="edit-form-but" disabled={submitting}>Submit</button>
                </div>
            </div>

            <div className={"ticket-form"}>
                <h3>Coordinates</h3>
                <div className="label">(X , Y)</div>
                <Field name="coordinates" id="coordinates"
                       component="select" label="Coordinates">
                    {coordinatesList.map(o => <option key={o.id} value={o.id}>({o.x} , {o.y}) </option>)}
                </Field>
            </div>

            <div className={"ticket-form"}>
                <h3>Person</h3>
                <div className="label">Person's id</div>
                <Field name="person" id="person"
                       component="select">
                    {personList.map(o => <option key={o.id} value={o.id}>{o.id}</option>)}
                </Field>
            </div>
        </form>
    )
}

export default reduxForm({
    form: 'create-ticket-form',
})(CreateTicketForm)