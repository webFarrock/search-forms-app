import { SET_START_POINT } from '../actions/index';

export default function(state = {}, action) {

    switch (action.type) {
        case SET_START_POINT:
            return action.payload;
    }
    return state;
}
