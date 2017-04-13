import _ from 'lodash';
import {FETCH_ALLOWED_DATES, SET_CALENDAR_LOADING} from '../actions/index';

export default function (state = {dates: [], inited: false}, action) {

    switch (action.type) {
        case FETCH_ALLOWED_DATES:
            if (action.payload) {
                return {
                    loading: false,
                    inited: true,
                    dates: action.payload,
                };
            }
        case SET_CALENDAR_LOADING:
            if (action.payload) {
                return {
                    loading: action.payload,
                };
            }

    }
    return state;
}
