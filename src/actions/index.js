import axios from 'axios';

export const SET_START_POINT = 'SET_START_POINT';

export const FETCH_COUNTRIES = 'FETCH_COUNTRIES';
export const FETCH_REGIONS = 'FETCH_REGIONS';
export const FETCH_HOTELS = 'FETCH_HOTELS';
export const FETCH_HOTELS_BY_REGION = 'FETCH_HOTELS_BY_REGION';
export const FETCH_HOTELS_BY_COUNTRY = 'FETCH_HOTELS_BY_COUNTRY';
export const FETCH_ALLOWED_DATES = 'FETCH_ALLOWED_DATES';

export const SET_COUNTRY = 'SET_COUNTRY';
export const SET_REGION = 'SET_REGION';
export const SET_HOTEL = 'SET_HOTEL';

export const SET_ADULTS = 'SET_ADULTS';
export const SET_KIDS = 'SET_KIDS';
export const SET_DURATION = 'SET_DURATION';
export const SET_TOUR_TYPE = 'SET_TOUR_TYPE';
export const SET_TOUR_DATE = 'SET_TOUR_DATE';

export const SET_FORM_ERRORS = 'SET_FORM_ERRORS';

export const SET_CALENDAR_LOADING = 'SET_CALENDAR_LOADING';

export function fetchAllowedDates(opt){
    if(opt.selectedCity && opt.selectedCountry){
        return (dispatch) => {
            dispatch({
                type: FETCH_ALLOWED_DATES
            });


            let xhr = $.ajax({
                url: '/local/ajax/get-allowed-dates.php',
                data: {
                    selectedCity: opt.selectedCity,
                    selectedCountry: opt.selectedCountry,
                    packType: opt.packType,
                    WhatGet: 'getAllowedDates',
                    timeout: 10000,
                },
                beforeSend: () => {
                    dispatch({
                        type: SET_CALENDAR_LOADING,
                        payload: true
                    });

                },
                method: 'POST',
                dataType: 'json',
                cache: false,
            }).success(
                (response) => {
                    dispatch({
                        type: FETCH_ALLOWED_DATES,
                        payload: response
                    });
                }
            ).error((response) => {
                dispatch({
                    type: FETCH_ALLOWED_DATES,
                    payload: [],
                });

            }).always((response) => {
                dispatch({
                    type: SET_CALENDAR_LOADING,
                    payload: false
                });
            });


            if(!window.getAllowedDatesXHR){
                window.getAllowedDatesXHR = [];
            }

            window.getAllowedDatesXHR.push(xhr);
        }
    }

    return {
        type: FETCH_ALLOWED_DATES,
        payload: [],
    }
}

export function setFormErrors(errors){

    return {
        type: SET_FORM_ERRORS,
        payload: errors,
    }
}

export function setTourDate(tourDate){
    return {
        type: SET_TOUR_DATE,
        payload: tourDate,
    }
}

export function setTourType(tourType){
    return {
        type: SET_TOUR_TYPE,
        payload: tourType, 
    }
}

export function setKids(kids){ 
    return {
        type: SET_KIDS,
        payload: kids,
    }
}

export function setDuration(duration){
    return {
        type: SET_DURATION,
        payload: duration,
    }
}

export function setAdults(num){
    return {
        type: SET_ADULTS,
        payload: num,
    }
}

export function setStartPoint(city){
    return {
        type: SET_START_POINT,
        payload: city
    }

}


export function fetchCountries(){

    const url = '/local/ajax/destination.php?view[]=COUNTRY';
    const request = axios.get(url);

    return {
        type: FETCH_COUNTRIES,
        payload: request
    }
}

export function fetchRegions(){

    const url = '/local/ajax/destination.php?view[]=REGION';
    const request = axios.get(url);

    return {
        type: FETCH_REGIONS,
        payload: request
    }
}

export function fetchHotels(name){

    const url = '/local/include/ajax/get-hotels-list.php?NAME='+name;

    var request = [];

    if(name){
        request = axios.get(url);
    }

    return {
        type: FETCH_HOTELS,
        payload: request
    }

}
export function fetchHotelsByRegion(id){

    const url = '/local/include/ajax/get-hotels-list.php?regionId='+id;

    var request = [];

    if(id){
        request = axios.get(url);
    }

    return {
        type: FETCH_HOTELS_BY_REGION,
        payload: request
    }

}
export function fetchHotelsByCountry(id){

    const url = '/local/include/ajax/get-hotels-list.php?countryId='+id;

    var request = [];

    if(id){
        request = axios.get(url);
    }

    return {
        type: FETCH_HOTELS_BY_COUNTRY,
        payload: request
    }

}

export function setCountry(country){
    return {
        type: SET_COUNTRY,
        payload: country
    }
}

export function setRegion(region){
    return {
        type: SET_REGION,
        payload: region,
    }
}

export function setHotel(hotel){
    return {
        type: SET_HOTEL,
        payload: hotel,
    }
}




