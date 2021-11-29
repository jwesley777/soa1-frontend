import '../../css/table-layout.css';
import TicketEditForm from "../editForms/TicketEditForm";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {updateTicket} from "../../actions/ticketActions";


function TicketEditPage() {
    const {id} = useParams();
    const dispatch = useDispatch();


    const onSubmit = (formData) => {
        dispatch(updateTicket(formData));
    };

    return (
        <div className="table-layout">
            <h2>Edit ticket (ID: {id})</h2>
            <hr/>
            <TicketEditForm id={id} onSubmit={onSubmit}/>
        </div>
    );
}

export default TicketEditPage;
