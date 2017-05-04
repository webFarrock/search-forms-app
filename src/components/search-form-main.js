import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setFormErrors} from '../actions/index';
import {prepareUrl, initWaypoints} from '../tools/index';

import FormSubmitBtn from './FormSubmitBtn';
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


        initWaypoints();

    }

    componentDidUpdate(){

        initWaypoints();

        $(window).scroll(function () {
            var scrolled = $(this).scrollTop();
            var $head = $('header.header');
            var $nav = $('nav.nav');
            var $bH = $(window).height();

            if (scrolled < $bH) {
                $head.addClass('on-top');
            } else {
                $head.removeClass('on-top');
            }
            if (scrolled >= $bH) {
                $head.addClass('painted');
                $nav.addClass('fixed');
                $('section.information').css('opacity', 0);
                if (!$('header .tour-filter.main-filter').length) {
                    $head.append( $( '.tour-filter.main-filter' ) );
                }
            } else {
                $head.removeClass('painted');
                $nav.removeClass('fixed');
                $('section.information').css('opacity', 1);
                if (!$('.main .tour-filter.main-filter').length) {
                    $( '.tour-filter.main-filter' ).insertBefore('.main .inner');
                }
            }
        });

    }

    onFormSubmit(e){
        e.preventDefault();

        if(this.chkForm()){
            prepareUrl(this.props);
            document.location.href = `/tour-search/?${prepareUrl(this.props)}`;
        }

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

    render() {
        return (
            <div className="main-filter header-position">

                <h3>В ритме путешествий</h3>

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

                    <FormSubmitBtn />
                </form>
            </div>
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