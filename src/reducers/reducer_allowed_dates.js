import _ from 'lodash';
import {FETCH_ALLOWED_DATES} from '../actions/index';

export default function (state = {dates: [], inited: false}, action) {

    switch (action.type) {
        case FETCH_ALLOWED_DATES:
            
            if (action.payload.data) {
                return {
                    inited: true,
                    dates: JSON.parse(action.payload.data),
                };
            }else if(action.payload instanceof Array){ // временно
                return {
                    inited: true,
                    dates: action.payload,
                };

            }
    }
    return state;
}
