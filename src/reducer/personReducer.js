import {SET_EDITED_PERSON, SET_PERSONS} from "../constants/personActionsConsts";

const initialState = {
    personsList: [{id: "", height: "", eyeColor: "", location: {}}],
    editedPerson: {id: "", height: "", eyeColor: "", location: {}}
};

export function personReducer(state = initialState, action) {
    switch (action.type) {
        case SET_PERSONS:
            return {
                ...state,
                personsList: action.payload
            };
        case SET_EDITED_PERSON:
            return {
                ...state,
                editedPerson: action.payload
            };
        default:
            return state;
    }
}

