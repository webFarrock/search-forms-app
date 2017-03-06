import { SET_TOUR_TYPE } from '../actions/index';
import tourTypesList from '../data/tourTypesList.json';

const tourType = tourTypesList.filter(i => i.default)[0];

export default function(state = tourType, action) {

    switch (action.type) {
        case SET_TOUR_TYPE:
            return action.payload;
    }

    return state;
}
