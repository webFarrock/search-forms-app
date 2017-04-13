import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {setTourDate} from '../actions/index';
import moment from 'moment';

class TourDate extends Component{
    constructor(props){
        super(props);

        this.tomorrow = moment().add(1, 'day').format('DD.MM.YYYY');

        this.state = {
            acShow: false,
            minDate: this.tomorrow,
            tourDate: this.tomorrow,
            allowedDates: [],
        }

        if(RuInturistStore && RuInturistStore.initForm && RuInturistStore.initForm.dateFrom){
            this.state.tourDate = RuInturistStore.initForm.dateFrom;
        }else{
            this.state.tourDate = this.tomorrow;
        }


        this.onFocusInput = this.onFocusInput.bind(this);
    }


    initCalendar(){}


    componentDidMount(){

        this.props.setTourDate(this.state.tourDate);

        this.dp = $('.js-datepicker-from');

        window.__set_threedays_in_calendar = function() {
            if ($('a.datepick-selected').length > 0 && $('input#three-days').prop("checked")) {
                var selected_date = $('a.datepick-selected').attr('class').split('dp')[1].split(' ')[0];
                var inc = 86400000;
                var date_num1 = selected_date * 1 + inc * 1;
                var date_num2 = selected_date * 1 + inc * 2;
                var date_num3 = selected_date * 1 + inc * 3;
                $('.dp' + date_num1).addClass('three-days-date');
                $('.dp' + date_num2).addClass('three-days-date');
                $('.dp' + date_num3).addClass('three-days-date').addClass('tdd-last');
                var pdate_num1 = selected_date * 1 - inc * 1;
                var pdate_num2 = selected_date * 1 - inc * 2;
                var pdate_num3 = selected_date * 1 - inc * 3;
                $('.dp' + pdate_num1).addClass('three-days-date');
                $('.dp' + pdate_num2).addClass('three-days-date');
                $('.dp' + pdate_num3).addClass('three-days-date').addClass('tdd-first');
            } else {
                $('a.three-days-date').removeClass('three-days-date');
            }

            if ($('#three-days:checked').length > 0) {
                $('input.js-datepicker-from').parents('.form-type-out').addClass('three-days-active');
            } else {
                $('input.js-datepicker-from').parents('.form-type-out').removeClass('three-days-active');
            }

        }

        $.extend($.datepick, {
            highlightThreeDays: function (picker, inst) {

                /*
                if ($('input.js-datepicker-from').parents('.form-type-out').hasClass('three-days-active')) {
                    console.log('ONE');
                    $('input#three-days').prop("checked", true);
                } else {
                    console.log('TWO');
                    $('input#three-days').prop("checked", true);
                    //$('input#three-days').prop("checked", false);
                }*/

                //console.log('!!!!!!!!!!!!');
                //$('input#three-days').prop("checked", true);

                __set_threedays_in_calendar();

                if ($(window).height() > 750) {

                    $('.datepick-popup').css("margin-top", -($('.js-datepicker-from').parent().height() + 13) + 'px');
                } else {
                    $('.datepick-popup').css("margin-top", ($('.js-datepicker-from').parent().offset().top) + 'px');
                }
            },
        });

        let datepickerTemplate = $.extend({}, $.datepick.defaultRenderer, {
            picker: '<div class="datepick">' +
            '{months}' + '<div class="datepick-clear-fix"></div><div class="datepick-fluid-dates">' +
            '<span class="three-days"><input id="three-days" checked="true" class="stylized" name="poll"  type="checkbox" onclick = "__set_threedays_in_calendar();"><label for="three-days">3 дня (гибкие даты)</label></span>' +
            '</div></div>',
            monthRow: '<div class="datepick-month-row">{months}</div>',
            month: '<div class="datepick-month"><div class="datepick-month-header">{link:prevJump}{link:prev}{link:nextJump}{link:next}{monthHeader:<span>MM</span><span>yyyy</span>}</div>' +
            '<table><thead>{weekHeader}</thead><tbody>{weeks}</tbody></table></div>',
        });


        this.dp.datepick({
            showAnim: 'fade',
            dateFormat: "dd.mm.yyyy",
            renderer: datepickerTemplate,
            changeMonth: false,
            monthsToShow: datepickerMonthToShow(),
            minDate: this.state.minDate,
            onShow: $.datepick.highlightThreeDays,
            onSelect:  (date) => {
                $(this.refs.input).blur();

                console.log('======================');
                console.log('$(this.refs.input): ', $(this.refs.input));
                console.log('======================');

                this.props.setTourDate(moment(date.toString()).format('DD.MM.YYYY'));
            },

        });


    }

    onFocusInput(){
        this.setState({
            acShow: true,
        });
    }

    componentWillReceiveProps(nextProps){
        this.dp.datepick('option', 'allowedDatesInited', nextProps.allowedDates.inited);
        this.dp.datepick('option', 'allowedDates', nextProps.allowedDates.dates);
    }

    render(){
        
        const {loading} = this.props.allowedDates;

        let arDateClass = ['form-item', 'form-type-out'];

        if(this.props.wpCls){
            arDateClass.push(this.props.wpCls);
        }

        
        if(loading){
            arDateClass.push('loading');
        }


        return(
            <div className={arDateClass.join(' ')}>
                <span className="icon-font icon-calendar">
                    <span className="path1"></span><span className="path2"></span>
                </span>
                <label>
                    <div className="wrapper">
                        <span className="title">Вылет:</span>
                    </div>
                </label>
                <input type="text"
                       ref="input"
                       name="dateFrom"
                       placeholder="17 декабря 2017"
                       value={this.props.tourDate}
                       className="js-datepicker-from input__date form-text hidden" readOnly
                />

            </div>
        );
    }
}



function mapDispatchToProps(dispatch){
    return bindActionCreators({setTourDate}, dispatch);
}

function mapStateToProps(state){
    return {
        tourDate: state.tourDate,
        allowedDates: state.allowedDates,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TourDate);  

