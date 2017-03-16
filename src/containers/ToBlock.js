import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {naturalSort} from '../tools/index';
import {isMatchUserInput} from '../tools/index';
import {
    fetchAllowedDates,
    fetchCountries,
    fetchRegions,
    setCountry,
    setRegion,
    setHotel,
} from '../actions/index';
import _ from 'lodash';

class ToBlock extends Component{
    


    constructor(props){
        super(props);

        this.state = {
            acShow: false,
            term: '',
            userInputStarted: false,
        }

        let RuInturistStore = window.RuInturistStore || {}
        RuInturistStore.destination = RuInturistStore.destination || {};

        this.countryList = RuInturistStore.destination.COUNTRY || [];
        this.regionList = RuInturistStore.destination.REGION || [];
        this.hotelList = RuInturistStore.destination.HOTEL || [];


        this.onKeyUpInput = this.onKeyUpInput.bind(this);
        this.onFocusInput = this.onFocusInput.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onFieldIconClick = this.onFieldIconClick.bind(this);

    }

    initData(){
        if(RuInturistStore && RuInturistStore.initForm){

            const countryId = +RuInturistStore.initForm.country;
            const arRegion = RuInturistStore.initForm.region;
            const arHotel = RuInturistStore.initForm.hotel;

            if(countryId){
                const obCountry = this.countryList.filter(i => i.id == countryId)[0] || {}
                this.setCountry(obCountry);
            }

            if (arRegion instanceof Array && arRegion.length){
                const obRegionsById = _.mapKeys(this.regionList, 'id');

                arRegion.forEach(regionId => {
                    const obRegion = obRegionsById[regionId];
                    if(obRegion){
                        this.setRegion(obRegion);
                    }
                });

            }

            if (arHotel instanceof Array && arHotel.length){
                const obHotelsById = _.mapKeys(this.hotelList, 'id');

                arHotel.forEach(hotelId => {
                    const obHotel = obHotelsById[hotelId];
                    if(obHotel){
                        this.setHotel(obHotel);
                    }
                })

            }

        }
    }

    componentDidMount(){

        $('body').on('click', (e) => {
            if(!$(e.target).parents('.form-type-to').length){
                if(this.state.acShow){
                    this.setState({
                        acShow: false,
                        term: '',
                        userInputStarted: false,
                    });
                }
            }
        });

        this.initData();
    }

    setCountry(country){
        this.setState({term: ''});
        this.props.setCountry(country);

        this.props.fetchAllowedDates({
            selectedCity: this.props.selectedStartPoint.id,
            selectedCountry: country.id,
            packType: this.props.tourTypes,
        });
    }

    setRegion(region){

        this.setState({term: ''});
        this.props.setRegion(region);

    }

    setHotel(hotel){

        this.setState({term: ''});
        this.props.setHotel(hotel);

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

        let popularCountries = this.countryList.filter(i => i.popular);

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
        let countries  = _.sortBy(this.countryList, (o) => o.value);

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
        let cities = this.regionList.filter(city => +city.parent === +this.props.selectedCountry.id)

        if(this.state.term && this.state.userInputStarted){
            cities = cities.filter(city => isMatchUserInput(this.state.term, city));
        }

        cities  = _.sortBy(cities, (o) => o.value);

        let selectAllCls = "list__item select-all";

        if(!Object.keys(this.props.selectedRegions).length){
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
                        if(this.props.selectedRegions[city.id]){
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


    clearField(){
        this.setState({term: ''});
        this.props.setCountry({});
        this.props.setRegion({});
        this.props.setHotel({});
    }

    onFieldIconClick(){
        if(this.props.selectedCountry.id){
            this.clearField();
        }else{
            this.refs.input.focus();
        }
    }

    renderHotels(){

        let hotels = this.hotelList;
        
        hotels = hotels.filter(hotel => +hotel.countryId === +this.props.selectedCountry.id);

        if(Object.keys(this.props.selectedRegions).length){
            let rIDs = {};
            for(let key in this.props.selectedRegions){
                rIDs[this.props.selectedRegions[key].id] = true;
            }

            hotels = hotels.filter(hotel => rIDs[hotel.parent]|| rIDs[hotel.parent2]);

        }

        if(this.state.term && this.state.userInputStarted){
            hotels = hotels.filter(hotel => isMatchUserInput(this.state.term, hotel));
        }

        const obCountriesById = _.mapKeys(this.countryList, 'id');
        const obRegionsById = _.mapKeys(this.regionList, 'id');


        let selectAllCls = ['list__item', 'select-all'];

        if(!Object.keys(this.props.selectedHotels).length){
            selectAllCls.push('-active');
        }


        return (
            <div className="wrapper-data col__left filter__row__70">
                <div className="header-dropdown">Отели</div>

                <ul className="list quick-dropdown__list">
                    <li className={selectAllCls.join(' ')}
                        onClick={() => this.setHotel({})}
                    >все <i></i></li>

                    {hotels.map(hotel => {
                        let hotelLocation = [];
                        const hotelCountry = obCountriesById[hotel.countryId];
                        const hotelRegion = obRegionsById[hotel.parent || hotel.parent2]

                        if(hotelCountry) hotelLocation.push(hotelCountry.value);
                        if(hotelRegion) hotelLocation.push(hotelRegion.value);

                        hotelLocation = hotelLocation.join('/');


                        let hotelCls = ['list__item'];

                        if(this.props.selectedHotels[hotel.id]){
                            hotelCls.push('-active');
                        }

                        return (
                            <li key={hotel.id}
                                onClick={() => this.setHotel(hotel)}
                                className={hotelCls.join(' ')}
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
        
        console.log('render ToBlock.js');

        let arFormItemClass = ['form-item', 'form-type-to', 'with-autocomplete'];

        if(this.state.acShow){
            arFormItemClass.push('autocomplete-open');
        }

        if(this.props.wpCls){
            arFormItemClass.push(this.props.wpCls);
        }

        if(this.props.selectedCountry.id){
            arFormItemClass.push('filled');
        }

        if(this.props.formErrors.notSelectedCountry){
            arFormItemClass.push('error');
        }



        let arPlaceHolderDestination = [];

        if(this.props.selectedCountry.value){
            arPlaceHolderDestination.push(this.props.selectedCountry.value);
        }
        
        if(Object.keys(this.props.selectedRegions).length){
            arPlaceHolderDestination.push(_.values(this.props.selectedRegions).map(i => i.value).join(', '));
        }
        
        if(Object.keys(this.props.selectedHotels).length){
            arPlaceHolderDestination.push(_.values(this.props.selectedHotels).map(i => i.value).join(', '));
        }

        let placeholder = '(страна/город/курорт или отель)';
        let placeholderFake = null;
        let title = null;


        if(arPlaceHolderDestination.length){
            placeholderFake = arPlaceHolderDestination.join(' / ');
        }else{
           placeholderFake = placeholder;
        }

        if(placeholderFake){
            title = placeholderFake;
            placeholderFake = <span className="placeholder" onClick={() => this.refs.input.focus()}>{placeholderFake}</span>;
        }

        let value = this.state.term;

        if(!this.state.acShow){
            value = placeholderFake;
        }

        return(
            <div className={arFormItemClass.join(' ')} title={title}>
                <span
                    onClick={this.onFieldIconClick}
                    className="icon-font icon-arrow-right"
                ></span>
                <label>
                    <div className="wrapper">
                        <span className="title">Куда:</span>
                        {/*this.state.acShow ? '' : placeholderFake*/}
                    </div>
                </label>

                <input type="text"
                       ref="input"
                       value={this.state.acShow ? this.state.term : title}
                       onChange={(e) => this.onChangeInput(e)}
                       onFocus={this.onFocusInput}
                       onKeyUp={this.onKeyUpInput}
                       placeholder={this.state.acShow ? title : ''}
                       className="form-text"
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
        fetchAllowedDates,
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
        selectedRegions: state.selectedRegions,
        selectedHotels: state.selectedHotels,
        selectedStartPoint: state.selectedStartPoint,
        tourTypes: state.tourTypes,
        formErrors: state.formErrors,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ToBlock);