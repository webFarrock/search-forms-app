import _ from 'lodash';
import { FETCH_DESTINATIONS, SET_DESTINATIONS_LOADING } from '../actions/index';

export default function(state = [], action) {


    switch (action.type) {
        case FETCH_DESTINATIONS:
            return {
                countriesList: _.mapKeys(action.payload.data.COUNTRY, 'id'),
                regionsList: _.mapKeys(action.payload.data.REGION, 'id'),
                isLoading: false,
            };

            break;

        case SET_DESTINATIONS_LOADING:
            return {
                isLoading: true,
            }
            break;

    }
    return state;
}
