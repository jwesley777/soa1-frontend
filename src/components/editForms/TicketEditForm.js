import React, {useEffect} from 'react'
import {Field, reduxForm} from 'redux-form'
import '../../css/app.css';
import '../../css/edit-form.css';
import {useDispatch, useSelector} from "react-redux";
import {getSingleTicket} from "../../actions/ticketActions";
import {renderedInputField} from "../customFormComponents/rendetedInputField";
import {types} from "../../constants/enumConstants";
import {required} from "../../validators/required";
import {getCoordinates} from "../../actions/coordinatesActions";
import {useHistory} from "react-router-dom";
import {getPerson} from "../../actions/personsActions";

const TicketEditForm = (props) => {
    const {handleSubmit, pristine, reset, submitting, id} = props
    const dispatch = useDispatch();
    const ticketId = useSelector(state => state.tickets.editedTicket.id);
    const name = useSelector(state => state.tickets.editedTicket.name);
    const discount = useSelector(state => state.tickets.editedTicket.discount);
    const price = useSelector(state => state.tickets.editedTicket.price);
    const creationDate = useSelector(state => state.tickets.editedTicket.creationDate);
    const ticketType = useSelector(state => state.tickets.editedTicket.type);
    const coordinates = useSelector(state => state.tickets.editedTicket.coordinates);
    //const coordinatesId = useSelector(state => state.movies.editedTicket.coordinates.id);
    const person = useSelector(state => state.tickets.editedTicket.person);
    // const location = useSelector(state => state.tickets.editedTicket.screenWriter.location);
    const coordinatesList = useSelector(state => state.coordinates.coordinatesList);
    const locationList = useSelector(state => state.location.locationsList);
    const personList = useSelector(state => state.person.personsList);
    const history = useHistory();
    //const selectedCoordinates = useSelector(state => state.form.edit-ticket-form.values.coordinates)

    useEffect(() => {
        dispatch(getSingleTicket(id));
        dispatch(getCoordinates());
        //dispatch(getLocations());
        dispatch(getPerson());
    }, []);

    function handleEditCoordSubmit(evt) {
        evt.preventDefault();
        let element = document.getElementById("coordinates");
        history.push("/soa-lab1/coordinates/edit/" + element.value);
    }

    function handleCreateCoordSubmit(evt) {
        evt.preventDefault();
        history.push("/soa-lab1/coordinates/new");
    }

    function handleEditPersonSubmit(evt) {
        evt.preventDefault();
        let element = document.getElementById("person");
        history.push("/soa-lab1/person/edit/" + element.value);
    }

    function handleCreatePersonSubmit(evt) {
        evt.preventDefault();
        history.push("/soa-lab1/person/new");
    }


    useEffect(() => {
        props.reset();
        props.initialize({
            name: name,
            id: ticketId,
            discount: discount,
            price: price,
            creationDate: creationDate,
            type: ticketType,
            coordinates: coordinates.id,
            person: person.id,
        });
    }, [id, name, discount, price, ticketType, coordinates, person])

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
                    /*  validate={[required]}*/
                />
                <Field name="price" type="number"
                       component={renderedInputField} label="Price"
                    /*validate={[required]}*/
                />
                <Field name="creationDate" type="text"
                       component={renderedInputField} label="Creation date"
                       readonly="readonly"
                    /* validate={[required]}*/
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
                <div className={"buttons-div"}>
                    <div>
                        <button id={"edit-form-but"} onClick={handleEditCoordSubmit}>Edit</button>
                    </div>
                    <div>
                        <button id={"edit-form-but"} onClick={handleCreateCoordSubmit}>Create</button>
                    </div>
                </div>

            </div>

            <div className={"ticket-form"}>
                <h3>Person</h3>
                <div className="label">Person's id</div>
                <Field name="person" id="person"
                       component="select">
                    {personList.map(o => <option key={o.id} value={o.id}>{o.id}</option>)}
                </Field>
                <div className={"buttons-div"}>
                    <div>
                        <button id={"edit-form-but"} onClick={handleEditPersonSubmit}>Edit</button>
                    </div>
                    <div>
                        <button id={"edit-form-but"} onClick={handleCreatePersonSubmit}>Create</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default reduxForm({
    form: 'edit-ticket-form',
    keepDirtyOnReinitialize: true
})(TicketEditForm)