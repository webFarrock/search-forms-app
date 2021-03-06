import { SET_HOTEL } from '../actions/index';

export default function(state = {}, action) {

    switch (action.type) {
        case SET_HOTEL:
            if(!action.payload.id){
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
