import { SET_FORM_ERRORS } from '../actions/index';

export default function(state = {}, action) {

    switch (action.type) {
        case SET_FORM_ERRORS:
            return action.payload;
    }

    return state;
}
