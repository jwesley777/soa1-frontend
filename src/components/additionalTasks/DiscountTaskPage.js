import '../../css/table-layout.css';
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {SET_DISCOUNT, SET_TICKET_LIST} from "../../constants/additionalActionsConsts";
import {getLengthCount, getTicketList} from "../../actions/additionalTasksActions";
import {useHistory} from "react-router-dom";
import PersonTable from '../../personTableComponents/PersonTable';

function DurationTaskPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    //const durationCount = useSelector(state => state.additional.lengthCount);
    const ticketList = useSelector(state => state.additional.ticketList);
    const [localDiscount, setLocalDiscount] = useState("");


    useEffect(() => {
        return history.listen(location => {
            if (history.action === 'POP') {
                dispatch({
                    type: SET_TICKET_LIST,
                    payload: []
                });
            } else {

            }

        })
    }, [])

    function handleOnChangeDiscount(event) {
        let input = event.target.value;
        setLocalDiscount(input);
    }

    function handleOnFocusDiscount(event) {
        setLocalDiscount("");
        dispatch({
            type: SET_TICKET_LIST,
            payload: []
        });
    }

    function handleOnBlurDiscount(event) {
        let input = event.target.value;
        if (input !== "" && Number.isInteger(Number(input)) && Number(input) >= 0) {
            dispatch(getTicketList(input));
        } else {
            setLocalDiscount("")
        }
    }

    function redirectOnMain() {
        dispatch({
            type: SET_TICKET_LIST,
            payload: []
        });
        history.push("/soa-lab1");
    }

    return (
        <div className="task-layout">
            <h1>Discount task</h1>
            <div className={"add-task-container"}>
                <div>Get tickets exist with discount less than</div>
                <input type={"number"} className={"add-input"} value={localDiscount}
                       onChange={handleOnChangeDiscount}
                       onFocus={handleOnFocusDiscount}
                       onBlur={handleOnBlurDiscount}/>
            </div>
            {(!Array.isArray(ticketList) || ticketList.length > 0) &&
            <PersonTable/>
            }
            <button className={"back-movie-but"} onClick={redirectOnMain}>BACK TO TICKETS</button>
        </div>
    );
}

export default DurationTaskPage;
