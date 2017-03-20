import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setFormErrors} from '../actions/index';
import {prepareUrl} from '../tools/index';

import FormSubmitBtn from './FormSubmitBtn';
import FromBlock from '../containers/FromBlock';
import ToBlock from '../containers/ToBlock';
import Adults from '../containers/Adults';
import Kids from '../containers/Kids';
import Duration from '../containers/Duration';
import TourType from '../containers/TourType';
import TourDate from '../containers/TourDate';

class SearchFormInResult extends Component {

    constructor(props){
        super(props);


        // todo init from props
        this.state = {
            startPointListShow: false,
            destinationsListShow: false,
            childsShow: false,
            tourTypesShow: false,
        }

        this.onFormSubmit = this.onFormSubmit.bind(this);
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

        return !Object.keys(errors).length;

    }

    onFormSubmit(e){
        e.preventDefault();

        console.log(' onFormSubmit ');

        if(this.chkForm()){

            console.log('YES chkForm');
            prepareUrl(this.props);
            document.location.href = `/tour-search/?${prepareUrl(this.props)}`;

        }else{
            console.log('NO chkForm');
        }
        

    }

    render() {
        return (
            <form action="/tour-search/"  onSubmit={this.onFormSubmit}>

                <div className="inner">
                    <div className="tour-filter__top">
                        <div className="tour-filter__top__inner">
                            <div className="row col__left -col-50 tour-filter__left">

                                <FromBlock wpCls="transparent -col-40" />
                                <ToBlock wpCls="transparent -col-35" />
                                <TourType wpCls="transparent -col-25"/>

                            </div>
                            <div className="row col__left -col-50 tour-filter__right">

                                <TourDate wpCls="-col-30" />
                                <Duration wpCls="-col-30" />

                                <Adults wpCls="-col-22" hideLabel={true} />
                                <Kids wpCls="-col-18" hideLabel={true}/>

                            </div>
                        </div>
                        <div className="col__left tour-filter__button">
                            <FormSubmitBtn />
                        </div>
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


export default connect(mapStateToProps, mapDispatchToProps)(SearchFormInResult);
