import {SET_EDITED_TICKET, SET_TICKETS} from "../constants/ticketActionsConsts";

const initialState = {
    ticketList: [],
    editedTicket: {
        coordinates: {id: "", x: "", y: ""},
        person: {
            id: "", eyeColor: "", height: "",
            location: {id: "", x: "", name: "", y: ""}
        }
    }
};

export function ticketReducer(state = initialState, action) {
    switch (action.type) {
        case SET_TICKETS:
            console.log(action.payload);
            return {
                ...state,
                ticketList: action.payload
            };
        case SET_EDITED_TICKET:
            console.log(action.payload);
            return {
                ...state,
                editedTicket: action.payload
            };
        default:
            return state;
    }
}

