import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {naturalSort} from '../tools/index';
import {isMatchUserInput} from '../tools/index';
import {
    fetchCountries,
    fetchRegions,
    setCountry,
    setRegion,
    setHotel,
} from '../actions/index';
import _ from 'lodash';


import fakeCountriesList from '../../fakedata/destination_country_list.json';
import fakeRegionsList from '../../fakedata/destination_region_list.json';
import fakeHotelsList from '../../fakedata/ru_hotels.json';
//fakeHotelsList  = JSON.parse(fakeHotelsList);


class ToBlock extends Component{

    constructor(props){
        super(props);

        this.state = {
            acShow: false,
            term: '',
            userInputStarted: false,
        }


        this.onKeyUpInput = this.onKeyUpInput.bind(this);
        this.onFocusInput = this.onFocusInput.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);

    }

    componentDidMount(){

        $('body').on('click', (e) => {
            if(!$(e.target).parents('.form-type-to').length){
                this.setState({
                    acShow: false,
                    term: '',
                    userInputStarted: false,
                });
            }
        });
    }

    setCountry(country){
        this.setState({term: ''});
        this.props.setCountry(country);
    }

    setRegion(region){

        this.setState({term: ''});
        this.props.setRegion(region);

    }

    onFocusInput(){
        this.setState({
            acShow: true,
        });
    }

    onKeyUpInput(){
        this.setState({
            userInputStarted: true,
        });
    }

    onChangeInput(e){
        this.setState({
            term: e.target.value,
        });
    }

    renderPopular(){

        let popularCountries = fakeCountriesList.filter(i => i.popular);

        if(this.state.term && this.state.userInputStarted){
            popularCountries = popularCountries.filter(country => isMatchUserInput(this.state.term, country));
        }

        popularCountries = _.sortBy(popularCountries, (o) => [o.popular_weight, o.value]);

        return(
            <div className="wrapper-data col__left filter__row__30">
                <div className="header-dropdown">Популярные</div>

                <ul className="list quick-dropdown__list">
                    {popularCountries.map(country => {
                        return (
                            <li key={country.id}
                                className="list__item"
                                onClick={() => this.setCountry(country)}
                            >
                                {country.value}
                            </li>
                        );
                    })}
                </ul>

            </div>
        );
    }

    renderCountries(){
        let countries  = _.sortBy(fakeCountriesList, (o) => o.value);

        if(this.state.term && this.state.userInputStarted){
            countries = countries.filter(country => isMatchUserInput(this.state.term, country));
        }

        return(
            <div className="wrapper-data col__left filter__row__70">
                <div className="header-dropdown">Все страны</div>

                <ul className="list quick-dropdown__list list-2-col">
                    {countries.map(country => {
                        return (
                            <li key={country.id}
                                className="list__item"
                                onClick={() => this.setCountry(country)}
                            >
                                {country.value}
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }

    renderCities(){
        let cities = fakeRegionsList.filter(city => +city.parent === +this.props.selectedCountry.id)

        if(this.state.term && this.state.userInputStarted){
            cities = cities.filter(city => isMatchUserInput(this.state.term, city));
        }

        cities  = _.sortBy(cities, (o) => o.value);

        let selectAllCls = "list__item select-all";

        if(!this.props.selectedRegion.id){
            selectAllCls += ' -active';
        }

        return (
            <div className="wrapper-data col__left filter__row__30">
                <div className="header-dropdown">Курорты</div>

                <ul className="list quick-dropdown__list">
                    <li onClick={() => this.setRegion({})}
                        className={selectAllCls}
                        >все <i></i>
                    </li>
                    {cities.map(city => {

                        let cls = 'list__item';
                        if(+this.props.selectedRegion.id == +city.id){
                            cls += '  -active';
                        }

                        return (
                            <li key={city.id}
                                className={cls}
                                onClick={() => this.setRegion(city)}
                            >
                                {city.value} <i></i>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }

    renderHotels(){

        let hotels = fakeHotelsList;
        //console.log('__ pre hotels', hotels);
        
        hotels = hotels.filter(hotel => +hotel.countryId === +this.props.selectedCountry.id);

        if(this.props.selectedRegion.id){
            const rid = +this.props.selectedRegion.id;
            hotels = hotels.filter(hotel => +hotel.parent === rid || +hotel.parent2 === rid);
        }
        
        console.log('hotels: ', hotels.length);

        /*
        if(this.state.term && this.state.userInputStarted){
            hotels = hotels.filter(hotel => isMatchUserInput(this.state.term, hotel));
        }*/

        const obCountriesById = _.mapKeys(fakeCountriesList, 'id');
        const obRegionsById = _.mapKeys(fakeRegionsList, 'id');


        return (
            <div className="wrapper-data col__left filter__row__70">
                <div className="header-dropdown">Отели</div>

                <ul className="list quick-dropdown__list">
                    <li className="list__item select-all">все</li>

                    {hotels.map(hotel => {
                        let hotelLocation = [];
                        const hotelCountry = obCountriesById[hotel.countryId];
                        const hotelRegion = obRegionsById[hotel.parent || hotel.parent2]

                        if(hotelCountry) hotelLocation.push(hotelCountry.value);
                        if(hotelRegion) hotelLocation.push(hotelRegion.value);

                        hotelLocation = hotelLocation.join('/');

                        return (
                            <li key={hotel.id}
                                className="list__item"
                            >
                                <span className="col__left">{hotel.value}</span>
                                <span className="col__right">{hotelLocation}</span>
                                <i></i>
                            </li>

                        );
                    })}

                </ul>
            </div>
        );
    }

    render(){

        let arFormItemClass = ['form-item', 'form-type-to', 'with-autocomplete'];
        if(this.state.acShow)
            arFormItemClass.push('autocomplete-open')


        let arPlaceHolderDestination = [];

        if(this.props.selectedCountry.value){
            arPlaceHolderDestination.push(this.props.selectedCountry.value);
        }

        if(this.props.selectedRegion.value){
            arPlaceHolderDestination.push(this.props.selectedRegion.value);
        }

        if(this.props.selectedHotel.value){
            arPlaceHolderDestination.push(this.props.selectedHotel.value);
        }

        let placeholder;

        if(arPlaceHolderDestination.length){
            placeholder = arPlaceHolderDestination.join(' / ');
        }else if(this.state.acShow){
            placeholder = '';
        }else if(this.state.term){
            placeholder = this.state.term;
        }else{
            placeholder =  <span className="placeholder">(страна/город/курорт или отель)</span>;
        }

        /*
        const selectCountryStyle = {
            visibility: this.props.selectedCountry.id ? 'hidden' : 'visible',
        }

        const selectCityStyle = {
            visibility: this.props.selectedCountry.id ? 'visible' : 'hidden',
        }*/

        return(
            <div className={arFormItemClass.join(' ')}>
                <span className="icon-font icon-arrow-right"></span>
                <label>
                    <div className="wrapper">
                        <span className="title">Куда:</span>
                        {placeholder}
                    </div>
                </label>
                <input type="text"
                       value={this.state.term}
                       onChange={(e) => this.onChangeInput(e)}
                       onFocus={this.onFocusInput}
                       onKeyUp={this.onKeyUpInput}
                       className="form-text hidden"
                />

                {this.props.selectedCountry.id ? '' :
                    <div className="autocomplete select-country">
                        <div className="quick-dropdown">
                            <div className="wrapper-col-30-70">
                                {this.renderPopular()}
                                {this.renderCountries()}
                            </div>
                        </div>
                    </div>
                }
                {!this.props.selectedCountry.id ? '' :
                    <div className="autocomplete select-city">
                        <div className="quick-dropdown">
                            <div className="wrapper-col-30-70">
                                {this.renderCities()}
                                {this.renderHotels()}
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}




function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchCountries,
        fetchRegions,
        setCountry,
        setRegion,
        setHotel,
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        destinationsList: state.destinationsList,
        selectedCountry: state.selectedCountry,
        selectedRegion: state.selectedRegion,
        selectedHotel: state.selectedHotel,
        selectedStartPoint: state.selectedStartPoint,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ToBlock);