import _ from 'lodash';
import { FETCH_HOTELS, FETCH_HOTELS_BY_REGION, FETCH_HOTELS_BY_COUNTRY } from '../actions/index';

export default function(state = {}, action) {

    switch (action.type) {
        case FETCH_HOTELS:
        case FETCH_HOTELS_BY_REGION:
        case FETCH_HOTELS_BY_COUNTRY:

            if(action.payload.data){
                const data = JSON.parse(action.payload.data);
                if(data){
                    return _.mapKeys(data, 'id');
                }

            }else{
                return {}; 
            }
    }
    return state;
}
