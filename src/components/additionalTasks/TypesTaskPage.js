import '../../css/table-layout.css';
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {SET_TYPE_LIST} from "../../constants/additionalActionsConsts";
import {getTypeList} from "../../actions/additionalTasksActions";

function TypeTaskPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const typeList = useSelector(state => state.additional.typeList);

    useEffect(() => {
        // return history.listen(location => {
        //     if (history.action === 'POP') {
        //         getTypeList();
        //     } else {
        //         getTypeList();
        //     }

        // })
        dispatch(getTypeList());
    }, [])

    function redirectOnMain() {
        history.push("/soa-lab1");
        dispatch({
            type: SET_TYPE_LIST,
            payload: []
        });
    }

    return (
        <div className="task-layout">
            <h1>Ticket types task</h1>
            <div className={"add-task-container"}>
                <div>What unique ticket types are presented in table</div>
            </div>
            {typeList && typeList.length > 0 &&
            typeList.map(t => 
                <li>{t.type}</li>
            )
            }
            <button className={"back-movie-but"} onClick={redirectOnMain}>BACK TO MOVIES</button>
        </div>
    );
}

export default TypeTaskPage;
