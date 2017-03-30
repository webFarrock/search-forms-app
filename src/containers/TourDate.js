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

    componentDidMount(){

        this.props.setTourDate(this.state.tourDate);

        this.dp = $('.js-datepicker-from'); 

        this.dp.datepick({
            showAnim: 'fade',
            dateFormat: "dd.mm.yyyy",
            renderer: datepickerTemplate,
            changeMonth: false,
            monthsToShow: datepickerMonthToShow(),
            minDate: this.state.minDate,

            onSelect:  (date) => {
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

        let arDateClass = ['form-item', 'form-type-out'];

        if(this.props.wpCls){
            arDateClass.push(this.props.wpCls);
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

