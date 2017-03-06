import { SET_HOTEL } from '../actions/index';

export default function(state = {}, action) {

    switch (action.type) {
        case SET_HOTEL:
            return action.payload;
    }
    return state;
}
