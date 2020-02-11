import {FETCH_MESSAGES_BY_DATE_SUCCESS, FETCH_MESSAGES_FAILURE, FETCH_MESSAGES_SUCCESS} from "./action";

const initialState = {
    date: [],
    messages: [],
    error: null,
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MESSAGES_SUCCESS:
            return {...state, messages: action.message};
        case FETCH_MESSAGES_FAILURE:
            return {...state, error: action.error};
        case FETCH_MESSAGES_BY_DATE_SUCCESS:
            return {...state, date: action.date};
        default:
            return state
    }
};

export default reducer
