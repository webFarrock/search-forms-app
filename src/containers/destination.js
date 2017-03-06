import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {naturalSort} from '../tools/index';
import {bindActionCreators} from 'redux';
import {
    fetchCountries,
    fetchRegions,
    setCountry,
    setRegion,
} from '../actions/index';

class Destination extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedStartPoint: null,
            isDestinationsLoading: false,
            selectedDestination: null,
            selectedDestinationType: null,
        }

    }

    renderDestinations() {

        const destinationsList = this.props.destinationsList || {};


        let destinationInputClass = "";

        if (destinationsList.isLoading) {
            destinationInputClass += " input__loading ";
        }

        const countriesList = _.sortBy(destinationsList.countriesList, (o) => o.value);
        const regionsList = _.sortBy(destinationsList.regionsList, (o) => o.value);
        const sd = this.state.selectedDestination;
        const sdt = this.state.selectedDestinationType;

        return (
            <select
                onChange={this.onSelectChangeHandler.bind(this)}
                id="autocomplete-where"
                className={destinationInputClass}
                placeholder="страна / город / курорт или отель"
            >
                {!sd ? <option disabled selected></option> : false}

                {countriesList.map(country => {

                    const regions = regionsList.filter(region => +region.parent === +country.id);

                    if (regions.length) {

                        return (
                            [
                                <option
                                    value={`country${country.id}`}
                                    className="country-header" key={country.id}
                                    selected={sdt == 'country' && +sd.id === +country.id}
                                    data-country={country.id}>{country.value}</option>,
                                regions.map(region => {
                                    return (
                                        <option value={`region${region.id}`}
                                                key={region.id}
                                                data-country={region.parent}
                                                selected={sdt == 'region' && sd.id == region.id}
                                                data-region={region.id}>&nbsp;&nbsp;&nbsp; {region.value}</option>
                                    )
                                })]
                        )
                    } else {
                        return (
                            <option
                                selected={sdt == 'country' && +sd.id === +country.id}
                                value={`country${country.id}`}
                                key={country.id}
                                data-country={country.id}>{country.value}</option>
                        )
                    }

                })}
            </select>
        );
    }


    setCountry(country) {

        this.rmErrorLabel();

        this.props.setCountry(country);
        this.props.setRegion({});

        refreshAvaliableDates({
            inputCity: $('input[name=selected-city]').val(),
            inputCountry: country.id,
        });
    }

    setRegion(region) {

        this.props.setCountry({id: region.parent});
        this.props.setRegion(region);
        
        refreshAvaliableDates({
            inputCity: $('input[name=selected-city]').val(),
            inputRegion: region.id,
            inputCountry: region.parent,
        });

    }


    onSelectChangeHandler(e) {

        const selectedOption = document.querySelector(`option[value="${e.target.value}"]`);
        const countryId = selectedOption.getAttribute('data-country');
        const regionId = selectedOption.getAttribute('data-region');

        if (regionId) {
            const region = _.values(this.props.destinationsList.regionsList).filter(region => +region.id === +regionId)[0];
            this.setRegion(region);

            this.setState({
                selectedDestination: region,
                selectedDestinationType: 'region',
            });

        } else if (countryId) {
            const country = _.values(this.props.destinationsList.countriesList).filter(country => +country.id === +countryId)[0];
            this.setCountry(country);

            this.setState({
                selectedDestination: country,
                selectedDestinationType: 'country',
            });

        }
    }


    rmErrorLabel() {
        $('.input-to').removeClass('error-fld').find('.error-fld').removeClass('error-fld');
    }

    componentWillReceiveProps(nextProps){

        if(!this.state.selectedDestination && nextProps.destinationsList){
            let {countriesList, regionsList} = nextProps.destinationsList;

            let defaultCountry = _.values(countriesList).filter(country => country.default)[0];
            let defaultRegion = _.values(regionsList).filter(region => region.default)[0];

            if(defaultRegion){

                this.setRegion(defaultRegion);
                this.setState({
                    selectedDestination: defaultRegion,
                    selectedDestinationType: 'region',
                });

            }else if(defaultCountry){

                this.setCountry(defaultCountry);
                this.setState({
                    selectedDestination: defaultCountry,
                    selectedDestinationType: 'country',
                });

            }
        }
    }


    onClickInputFieldCl() {

        this.props.setCountry({});
        this.props.setRegion({});
        this.setState({
            isOnlyCountrySel: false,
        });
    }

    render() {

        return (
            <div className="col__left row input input-to">
                <div className="input__label">Куда</div>

                <div>
                    <div className="input__field">

                        {this.renderDestinations()}

                        <input type="hidden" name="destination"
                               value={this.props.selectedRegion.value || this.props.selectedCountry.value}/>
                        <input type="hidden" name="selected-country" value={this.props.selectedCountry.id}/>
                        <input type="hidden" name="selected-region" value={this.props.selectedRegion.id}/>
                        <input type="hidden" name="selected-hotel" value=""/>
                    </div>
                </div>

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
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        destinationsList: state.destinationsList,
        selectedCountry: state.selectedCountry,
        selectedRegion: state.selectedRegion,
        selectedStartPoint: state.selectedStartPoint,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Destination);