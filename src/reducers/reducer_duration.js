import { SET_DURATION } from '../actions/index';

export default function(state = 7, action) {

    switch (action.type) {
        case SET_DURATION:
            return action.payload;
    }

    return state;
}
