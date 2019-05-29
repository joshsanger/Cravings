import * as actionTypes from './actions.js'

const initialState = {
    url           : '',
    submitDisabled: true,
    cravings      : []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INPUT_URL_FIELD:
            return {
                ...state,
                url: action.payload
            };
        case actionTypes.UPDATE_CRAVINGS:
            return {
                ...state,
                cravings: action.payload
            }
        default:
            return state;
    }
};

export default reducer;