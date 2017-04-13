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


        var $head = $('header.header');
        $('main.main').each(function (i) {
            var $el = $(this),
                animClassDown = $el.data('animateDown'),
                animClassUp = $el.data('animateUp');
            $el.waypoint(function (direction) {
                if (direction === 'down' && animClassDown) {
                    $('.main-filter').attr('class', 'main-filter hidden');
                }
                else if (direction === 'up' && animClassUp) {
                    $('.main-filter').attr('class', 'main-filter header-position');
                }
            }, {offset: '35%'});
            $el.waypoint(function (direction) {
                if (direction === 'down' && animClassDown) {
                    $('.main-filter').attr('class', 'main-filter content-position');
                }
                else if (direction === 'up' && animClassUp) {
                    $('.main-filter').attr('class', 'main-filter hidden');
                }
            }, {offset: '34%'});
            $el.waypoint(function (direction) {
                var openclass = '';
                if ($head.hasClass('open')) openclass = ' open';
                if (direction === 'down' && animClassDown) {
                    $head.attr('class', 'header ha-header ' + animClassDown + openclass);
                }
                else if (direction === 'up' && animClassUp) {
                    $head.attr('class', 'header ha-header ' + animClassUp + openclass);
                }
            }, {offset: '5%'});
        });
        if (($(window).width() > 1919) && ($(window).height() > 750)) {
            $('.footer').waypoint(function (direction) {
                var doc_height = get_document_height();
                if (direction === 'down') {
                    $('.left-sidebar').height(doc_height + $(window).height());
                    $('.main-filter').css("bottom", "440px");
                    $('.main-filter').css("position", "absolute");
                    $('.main-filter').css("top", "auto");
                } else {
                    $('.left-sidebar').height('auto');
                    $('.main-filter').css("bottom", "");
                    $('.main-filter').css("top", "");
                    $('.main-filter').css("position", "");
                }
            }, {offset: '905px'});


        } else if (($(window).width() > 1279) && ($(window).width() < 1920) && ($(window).height() > 750)) {
            $('.footer').waypoint(function (direction) {
                var doc_height = get_document_height();
                if (direction === 'down') {
                    $('.left-sidebar').height(doc_height + $(window).height());
                    $('.main-filter').css("bottom", "1770px");
                    $('.main-filter').css("position", "absolute");
                    $('.main-filter').css("top", "auto");
                } else {
                    $('.left-sidebar').height('auto');
                    $('.main-filter').css("bottom", "");
                    $('.main-filter').css("top", "");
                    $('.main-filter').css("position", "");
                }
            }, {offset: '2160px'});
        } else if (($(window).width() > 768) && ($(window).width() < 1280) && ($(window).height() > 750)) {
            $('.footer').waypoint(function (direction) {
                var doc_height = get_document_height();
                if (direction === 'down') {
                    $('.left-sidebar').height(doc_height + $(window).height());
                    $('.main-filter').css("bottom", "1115px");
                    $('.main-filter').css("position", "absolute");
                    $('.main-filter').css("top", "auto");
                } else {
                    $('.left-sidebar').height('auto');
                    $('.main-filter').css("bottom", "");
                    $('.main-filter').css("top", "");
                    $('.main-filter').css("position", "");
                }
            }, {offset: '1505px'});
        }

        function get_document_height() {
            var B = document.body,
                H = document.documentElement,
                height
            if (typeof document.height !== 'undefined') {
                height = document.height // For webkit browsers
            } else {
                height = Math.max(B.scrollHeight, B.offsetHeight, H.clientHeight, H.scrollHeight, H.offsetHeight);
            }
            return height;
        }

    }

    componentDidUpdate(){
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
                if (!$('header .tour-filter.main-filter').length) {
                    $head.append($('.tour-filter.main-filter'));
                }
            } else {
                $head.removeClass('painted');
                $nav.removeClass('fixed');
                if (!$('.main .tour-filter.main-filter').length) {
                    $('.tour-filter.main-filter').insertBefore('.main .inner');
                }
            }
        });




    }

    onFormSubmit(e){
        e.preventDefault();

        if(this.chkForm()){

            //console.log('YES chkForm');
            prepareUrl(this.props);
            document.location.href = `/tour-search/?${prepareUrl(this.props)}`;

        //}else{
            //console.log('NO chkForm');
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

                <h3>Попробуй мир на вкус</h3>

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