import { combineReducers } from 'redux';

//import StartPointsReducer from './reducer_start_points';
import SetStartPointReducer from './reducer_set_start_point';

import CountriesReducer from './reducer_countries';
import RegionsReducer from './reducer_regions';
import HotelsReducer from './reducer_hotels';

import SetCountryReducer from './reducer_set_country';
import SetRegionReducer from './reducer_set_region';
import SetHotelReducer from './reducer_set_hotel';

import SetAdultsReducer from './reducer_adults';
import SetKidsReducer from './reducer_kids';
import SetDurationReducer from './reducer_duration';
import SetTourTypeReducer from './reducer_tour_type';

console.log('!!!!!!!');
console.log('!!!!!!!');
console.log('!!!!!we!!');
console.log('!!!!!we!!wwww');


const rootReducer = combineReducers({

    //startPointsList: StartPointsReducer,
    selectedStartPoint: SetStartPointReducer,

    countriesList: CountriesReducer,
    regionsList: RegionsReducer,
    hotelsList: HotelsReducer,

    selectedCountry: SetCountryReducer,
    selectedRegion: SetRegionReducer,
    selectedHotel: SetHotelReducer,

    adults: SetAdultsReducer,
    kids: SetKidsReducer,
    duration: SetDurationReducer,
    tourType: SetTourTypeReducer,

});

export default rootReducer;

