import * as actionTypes from './actions.js'

const initialState = {
    url           : '',
    submitDisabled: true,
    cravings      : [],
    fetching      : false
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
        case actionTypes.REMOVE_CRAVING:

            const cravings = state.cravings.filter((craving) => (craving.id != action.payload));
            localStorage.setItem('cravings', JSON.stringify(cravings));
            return {
                ...state,
                cravings
            }
        case actionTypes.ADD_CRAVING:

            const updatedCravings = [action.payload].concat(state.cravings);
            localStorage.setItem('cravings', JSON.stringify(updatedCravings));
            return {
                ...state,
                cravings: updatedCravings
            }
        case actionTypes.SET_FETCHING:
            return {
                ...state,
                fetching: action.payload
            }
        default:
            return state;
    }
};

export default reducer;