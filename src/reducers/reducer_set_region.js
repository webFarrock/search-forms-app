import { SET_REGION } from '../actions/index';

export default function(state = {}, action) {

    switch (action.type) {
        case SET_REGION:
            return action.payload;
    }
    return state;
}
