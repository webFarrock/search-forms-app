import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setFormErrors} from '../actions/index';


import CircleSpinning from './CircleSpinning';
import FromBlock from '../containers/FromBlock';
import ToBlock from '../containers/ToBlock';
import Adults from '../containers/Adults';
import Kids from '../containers/Kids';
import Duration from '../containers/Duration';
import TourType from '../containers/TourType';
import TourDate from '../containers/TourDate';



class SearchFormMain extends Component {

    constructor(props){
        super(props);

        this.state = {
            startPointListShow: false,
            destinationsListShow: false,
            childsShow: false,
            tourTypesShow: false,
        }

        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    componentDidMount(){
        // old events
        $('#search-form-top').off('submit');
    }

    onFormSubmit(e){
        e.preventDefault();

        console.log('this.props: ', this.props);

        this.chkForm();
    }

    prepareUrl(){

    }

    chkForm(){
        let errors = {};
        if(!this.props.selectedStartPoint.id){
            errors['notSelectedStartPoint'] = true;
        }
        if(!this.props.selectedCountry.id){
            errors['notSelectedCountry'] = true;
        }
        
        this.props.setFormErrors(errors);
    }

    render() {
        return (
            <form action="/tour-search/" id="search-form-top" onSubmit={this.onFormSubmit}>

                <div className="form-wrapper">

                    <FromBlock />
                    <ToBlock />
                    <TourType />
                    <TourDate />
                    <Duration />

                    <div className="col__2-wrapper">
                        <Adults />
                        <Kids />
                    </div>

                </div>
                <div className="form-actions">
                    <div className="filter__circle circle__container">

                        <CircleSpinning />

                        <button type="submit" className="filter__submit">
                            <span className="filter__submit__search blink_search_btn">ИСКАТЬ</span>
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}



function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setFormErrors,
    }, dispatch);
}

function mapStateToProps(state) {
    return {...state}
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchFormMain);