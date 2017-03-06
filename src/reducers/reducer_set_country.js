import { SET_COUNTRY } from '../actions/index';

export default function(state = {}, action) {

    switch (action.type) {
        case SET_COUNTRY:
            return action.payload;
    }
    return state;
}
