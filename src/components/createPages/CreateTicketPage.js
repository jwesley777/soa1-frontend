import '../../css/table-layout.css';
import {useDispatch} from "react-redux";
import {createTicket} from "../../actions/ticketActions";
import CreateTicketForm from "../createForms/CreateTicketForm";


function CreateTicketPage() {
    /*const history = useHistory();*/
    const dispatch = useDispatch();

    const onSubmit = (formData) => {
        dispatch(createTicket(formData));
        /* history.push('/');*/
    };

    return (
        <div className="table-layout">
            <h1>Create ticket</h1>
            <CreateTicketForm onSubmit={onSubmit}/>
        </div>
    );
}

export default CreateTicketPage;
