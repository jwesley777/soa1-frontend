import '../../css/table-layout.css';
import React, {useEffect} from "react";
import {getPerson} from "../../actions/personsActions";
import {useDispatch, useSelector} from "react-redux";
import {SET_TICKET_COUNT, SET_PERSON_LIST} from "../../constants/additionalActionsConsts";
import {useHistory} from "react-router-dom";
import {getTicketCount} from "../../actions/additionalTasksActions";
import PersonTable from "../../personTableComponents/PersonTable";

function ScreenwriterTaskPage() {
    const dispatch = useDispatch();
    const personList = useSelector(state => state.person.personsList);
    //const personList_ = useSelector(state => state.additional.personList);
    const ticketCount = useSelector(state => state.additional.ticketCount);
    const history = useHistory();

    useEffect(() => {
        dispatch(getPerson());
    }, []);

    useEffect(() => {
        return history.listen(location => {
            if (history.action === 'POP') {
                dispatch({
                    type: SET_PERSON_LIST,
                    payload: []
                });
            } else {

            }

        })
    }, [])

    function redirectOnMain() {
        history.push("/soa-lab1");
        dispatch({
            type: SET_TICKET_COUNT,
            payload: ""
        });
    }

    function handleOnChangePerson(event) {
        let input = event.target.value;
        if (input !== "")
            dispatch(getTicketCount(input));
    }


    return (
        <div className="task-layout">
            <h1>Person task</h1>
            <div className={"add-task-container"}>
                <div>Count tickets with PERSON's id less than</div>
                <select className={"add-select"}
                        onChange={handleOnChangePerson}
                        onBlur={handleOnChangePerson}>
                    {personList.map(o => <option key={o.id} value={o.id}>{o.id}</option>)}
                </select>
            </div>
            {ticketCount !== "" &&
            <div className={"answer"}> Answer: {ticketCount}</div>
            }

            <button className={"back-movie-but"} onClick={redirectOnMain}>BACK TO TICKETS</button>
        </div>
    );
}

export default ScreenwriterTaskPage;
