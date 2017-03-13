import { SET_TOUR_TYPE } from '../actions/index';
//import tourTypesList from '../data/tourTypesList.json';

//const tourType = tourTypesList.filter(i => i.default)[0];

export default function(state = {}, action) {

    switch (action.type) {
        case SET_TOUR_TYPE:
            if(!action.payload.value){
                return {};
            }else{

                let newState = {...state};

                if(newState[action.payload.id]){
                    delete newState[action.payload.id];
                } else {
                    newState[action.payload.id] = action.payload;
                }

                return newState;
            }
    }

    return state;
}
