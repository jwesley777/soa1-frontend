import {
    SET_TICKET_COUNT,
    SET_TICKET_LIST,
    SET_TYPE_LIST,
    SET_PERSON_LIST
} from "../constants/additionalActionsConsts";

const initialState = {
    // genre: "",
    // genreCount: "",
    // length: "",
    ticketCount: "",
    // screenwriter: {},
    typeList: [],
    ticketList: [],
    personList: []
};

export function additionalTasksReducer(state = initialState, action) {
    switch (action.type) {
        case SET_TYPE_LIST:
            return {
                ...state,
                typeList: action.payload
            };
        case SET_TICKET_COUNT:
            return {
                ...state,
                ticketCount: action.payload
            };
        case SET_TICKET_LIST:
            return {
                ...state,
                ticketList: action.payload
            };
        case SET_PERSON_LIST:
            return {
                ...state,
                personList: action.payload
            };
        // case SET_GENRE_COUNT:
        //     return {
        //         ...state,
        //         genreCount: action.payload
        //     };
        // case SET_GENRE:
        //     return {
        //         ...state,
        //         genre: action.payload
        //     };
        // case SET_SCREENWRITER_LIST:
        //     return {
        //         ...state,
        //         screenwriterList: action.payload
        //     };
        // case SET_LENGTH:
        //     return {
        //         ...state,
        //         length: action.payload
        //     };
        // case SET_LENGTH_COUNT:
        //     return {
        //         ...state,
        //         lengthCount: action.payload
        //     };
        // case SET_SCREENWRITER:
        //     return {
        //         ...state,
        //         screenwriter: action.payload
        //     };
        default:
            return state;
    }
}

