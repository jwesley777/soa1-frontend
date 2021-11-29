import '../../css/table-row.css';
import '../../css/app.css';
import {FaEdit, FaTrashAlt} from 'react-icons/fa';
import {useDispatch} from "react-redux";
import {deleteTicket} from "../../actions/ticketActions";
import {useHistory} from "react-router-dom";

function TableRow(props) {
    const ticket = props.ticket;
    const ticketId = ticket.id;
    const dispatch = useDispatch();
    const history = useHistory();

    function deleteHandler(id) {
        dispatch(deleteTicket(id));
    }

    function editHandler(id) {
        history.push("/soa-lab1/edit/" + id);
    }


    return (
        <div className="table-row base">
            <div className="id-div">{ticketId}</div>
            <div>{ticket.name}</div>
            <div>({ticket.coordinates.x} ; {ticket.coordinates.y})</div>
            <div>{ticket.creationDate}</div>
            <div>{ticket.discount}</div>
            <div>{ticket.price}</div>
            <div>{ticket.type.toLowerCase()}</div>
            <div>{ticket.person === undefined ? "null" : ticket.person.id}</div>
            <div className="action-div">
                <div onClick={() => editHandler(ticketId)}>
                    <FaEdit color="#3DC937FF" className="pointer icon"/>
                </div>
                <div onClick={() => deleteHandler(ticketId)}>
                    <FaTrashAlt className="pointer icon" color="#EB6767FF"/>
                </div>
            </div>
        </div>
    );
}

export default TableRow;
