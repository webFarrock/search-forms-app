import { SET_KIDS } from '../actions/index';

export default function(state = [], action) {

    switch (action.type) {
        case SET_KIDS:
            return action.payload;
    }

    return state;
}
