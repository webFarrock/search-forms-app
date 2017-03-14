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


        this.onFocusInput = this.onFocusInput.bind(this);
    }

    componentDidMount(){
        this.dp = $('.js-datepicker-from'); 
        /*
        
        $('body').on('click', (e) => {
            if(!$(e.target).parents('.form-type-type').length){
                this.setState({
                    acShow: false,
                });
            }
        });*/

        this.dp.datepick({
            showAnim: 'fade',
            dateFormat: "dd.mm.yyyy",
            renderer: datepickerTemplate,
            changeMonth: false,
            monthsToShow: datepickerMonthToShow(),
            minDate: this.state.minDate,

            onSelect:  (date) => {
                this.setState({
                    tourDate: moment(date.toString()).format('DD.MM.YYYY'),
                });
            },

        });

    }

    onFocusInput(){
        this.setState({
            acShow: true,
            //date:
        });
    }

    componentWillReceiveProps(nextProps){

        this.dp.datepick('option', 'allowedDatesInited', nextProps.allowedDates.inited);
        this.dp.datepick('option', 'allowedDates', nextProps.allowedDates.dates);
    }

    render(){

        return(
            <div className="form-item form-type-out loading">
                <span className="icon-font icon-calendar">
                    <span className="path1"></span><span className="path2"></span>
                </span>
                <label>
                    <div className="wrapper">
                        <span className="title">Вылет:</span>
                    </div>
                </label>
                <input type="text"
                       name="dateFrom"
                       placeholder="17 декабря 2017"
                       value={this.state.tourDate}
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

