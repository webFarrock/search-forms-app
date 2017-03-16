import { SET_TOUR_DATE } from '../actions/index';

export default function(state = '', action) {

    switch (action.type) {
        case SET_TOUR_DATE:
            return action.payload;
    }

    return state;
}
