import { SET_ADULTS } from '../actions/index';

export default function(state = 2, action) {

    switch (action.type) {
        case SET_ADULTS:
            return action.payload;
    }

    return state;
}
